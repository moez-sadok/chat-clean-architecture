import {
  ChatroomTable, IChatDatabase, MessageTable, ParticipantTable, UserTable
} from '@cca/core-gateways';
import { Collection, Db, IndexDescription, MongoClient } from 'mongodb';
import { MONGO_COLLECTIONS, MongoDatabaseConfig, mongoConfigFromEnv } from './mongo.config';
import { DEMO_DATASET } from './mongo.seed';

/** Stored shape: the table model, with its numeric id used as the mongo _id. */
type Doc<T extends { id: number }> = Omit<T, 'id'> & { _id: number };

const MAX_MESSAGES_PER_PAGE = 50;

/**
 * MongoDB adapter for the persistence port.
 *
 * Ids stay numeric (the table models own them) and are served by a `counters`
 * collection, so documents keep the schema the rest of the gateway expects and
 * _id doubles as the primary index.
 *
 * The denormalized `participantsIds` carried by users and rooms is maintained
 * on write: listing the rooms of a user then costs a fixed number of reads
 * instead of a scan of the participants collection.
 */
export class MongoDataBaseImpl implements IChatDatabase {

  private client?: MongoClient;
  private db?: Db;
  private readonly config: MongoDatabaseConfig;

  constructor(config: Partial<MongoDatabaseConfig> = {}) {
    this.config = { ...mongoConfigFromEnv(), ...config };
  }

  /** Connects, creates the indexes and (optionally) seeds an empty database. */
  async createDb(): Promise<void> {
    if (this.db) return;
    this.client = new MongoClient(this.config.url);
    await this.client.connect();
    this.db = this.client.db(this.config.dbName);
    await this.createIndexes();
    if (this.config.seed) await this.seedWhenEmpty();
  }

  async closeDb(): Promise<void> {
    await this.client?.close();
    this.client = undefined;
    this.db = undefined;
  }

  //rooms
  async getRoomById(roomId: number): Promise<ChatroomTable> {
    const doc = await this.rooms().findOne({ _id: roomId });
    return this.toRoom(doc);
  }

  async getRoomsByIds(roomIds: number[]): Promise<ChatroomTable[]> {
    if (roomIds.length === 0) return [];
    const docs = await this.rooms().find({ _id: { $in: roomIds } }).toArray();
    return docs.map((d) => this.toRoom(d));
  }

  async getChatRooms(): Promise<ChatroomTable[]> {
    const docs = await this.rooms().find().toArray();
    return docs.map((d) => this.toRoom(d));
  }

  async insertChatRoom(chatRoom: ChatroomTable): Promise<ChatroomTable> {
    const _id = await this.nextId(MONGO_COLLECTIONS.rooms);
    const doc: Doc<ChatroomTable> = { _id, name: chatRoom.name, participantsIds: chatRoom.participantsIds ?? [] };
    await this.rooms().insertOne(doc);
    return this.toRoom(doc);
  }

  //messages
  async insertMessage(message: MessageTable): Promise<MessageTable> {
    const _id = await this.nextId(MONGO_COLLECTIONS.messages);
    const doc: Doc<MessageTable> = {
      _id,
      participantId: message.participantId,
      roomId: message.roomId,
      content: message.content,
      created_at: message.created_at ?? new Date()
    };
    await this.messages().insertOne(doc);
    return this.toMessage(doc);
  }

  /** Oldest first, 50 per page — the page the room view asks for. */
  async getMessagesByRoom(roomId: number, page = 1): Promise<MessageTable[]> {
    const docs = await this.messages()
      .find({ roomId })
      .sort({ _id: 1 })
      .skip((page - 1) * MAX_MESSAGES_PER_PAGE)
      .limit(MAX_MESSAGES_PER_PAGE)
      .toArray();
    return docs.map((d) => this.toMessage(d));
  }

  //participants
  async getParticipantById(participantId: number): Promise<ParticipantTable> {
    const doc = await this.participants().findOne({ _id: participantId });
    return this.toParticipant(doc);
  }

  async getParticipantsByIds(participantIds: number[]): Promise<ParticipantTable[]> {
    if (participantIds.length === 0) return [];
    const docs = await this.participants().find({ _id: { $in: participantIds } }).toArray();
    return docs.map((d) => this.toParticipant(d));
  }

  async getParticipantsByRoom(roomId: number): Promise<ParticipantTable[]> {
    const docs = await this.participants().find({ chatRoomId: roomId }).toArray();
    return docs.map((d) => this.toParticipant(d));
  }

  async getParticipantsByUser(userId: number): Promise<ParticipantTable[]> {
    const docs = await this.participants().find({ userId }).toArray();
    return docs.map((d) => this.toParticipant(d));
  }

  async getParticipantByRoomAndUser(roomId: number, userId: number): Promise<ParticipantTable> {
    const doc = await this.participants().findOne({ chatRoomId: roomId, userId });
    if (!doc) throw new Error('User is not a participant in this chat room');
    return this.toParticipant(doc);
  }

  async insertParticipant(participant: ParticipantTable): Promise<ParticipantTable> {
    const _id = await this.nextId(MONGO_COLLECTIONS.participants);
    const doc: Doc<ParticipantTable> = {
      _id,
      userId: participant.userId,
      chatRoomId: participant.chatRoomId,
      isBot: participant.isBot
    };
    await this.participants().insertOne(doc);
    //keep the denormalized ids in sync (see class doc)
    await Promise.all([
      this.users().updateOne({ _id: participant.userId }, { $set: { [`participantsIds.${_id}`]: _id } }),
      this.rooms().updateOne({ _id: participant.chatRoomId }, { $addToSet: { participantsIds: _id } })
    ]);
    return this.toParticipant(doc);
  }

  async removeParticipant(id: number): Promise<void> {
    const doc = await this.participants().findOne({ _id: id });
    if (!doc) return;
    await Promise.all([
      this.participants().deleteOne({ _id: id }),
      this.users().updateOne({ _id: doc.userId }, { $unset: { [`participantsIds.${id}`]: '' } }),
      this.rooms().updateOne({ _id: doc.chatRoomId }, { $pull: { participantsIds: id } })
    ]);
  }

  //users
  async getUserById(userId: number): Promise<UserTable> {
    const doc = await this.users().findOne({ _id: userId });
    return this.toUser(doc);
  }

  async getUsersByIds(userIds: number[]): Promise<UserTable[]> {
    if (userIds.length === 0) return [];
    const docs = await this.users().find({ _id: { $in: userIds } }).toArray();
    return docs.map((d) => this.toUser(d));
  }

  async insertUser(user: UserTable): Promise<UserTable> {
    const _id = await this.nextId(MONGO_COLLECTIONS.users);
    const doc: Doc<UserTable> = { _id, name: user.name, email: user.email, participantsIds: {} };
    await this.users().insertOne(doc);
    return this.toUser(doc);
  }

  async getUses(): Promise<UserTable[]> {
    const docs = await this.users().find().toArray();
    return docs.map((d) => this.toUser(d));
  }

  /** Atomic sequence per collection: mongo has no auto-increment. */
  private async nextId(collection: string): Promise<number> {
    const counters = this.database().collection<{ _id: string; seq: number }>(MONGO_COLLECTIONS.counters);
    const res = await counters.findOneAndUpdate(
      { _id: collection },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: 'after' }
    );
    if (!res) throw new Error(`Mongo: unable to allocate an id for ${collection}`);
    return res.seq;
  }

  private async createIndexes(): Promise<void> {
    const indexes: [string, IndexDescription[]][] = [
      [MONGO_COLLECTIONS.messages, [{ key: { roomId: 1, _id: 1 } }]],
      [MONGO_COLLECTIONS.participants, [
        { key: { chatRoomId: 1, userId: 1 }, unique: true },
        { key: { userId: 1 } }
      ]]
    ];
    for (const [name, description] of indexes) {
      await this.database().collection(name).createIndexes(description);
    }
  }

  private async seedWhenEmpty(): Promise<void> {
    if (await this.users().countDocuments({}, { limit: 1 }) > 0) return;
    const { users, rooms, participants, messages } = DEMO_DATASET;
    await Promise.all([
      this.users().insertMany(users.map((u) => this.toDoc(u))),
      this.rooms().insertMany(rooms.map((r) => this.toDoc(r))),
      this.participants().insertMany(participants.map((p) => this.toDoc(p))),
      this.messages().insertMany(messages.map((m) => this.toDoc(m)))
    ]);
    //the sequences must continue after the seeded ids
    const counters = this.database().collection<{ _id: string; seq: number }>(MONGO_COLLECTIONS.counters);
    await Promise.all(([
      [MONGO_COLLECTIONS.users, users],
      [MONGO_COLLECTIONS.rooms, rooms],
      [MONGO_COLLECTIONS.participants, participants],
      [MONGO_COLLECTIONS.messages, messages]
    ] as [string, { id: number }[]][]).map(([name, rows]) =>
      counters.updateOne(
        { _id: name },
        { $set: { seq: Math.max(...rows.map((r) => r.id)) } },
        { upsert: true }
      )));
  }

  private toDoc<T extends { id: number }>(row: T): Doc<T> {
    const { id, ...rest } = row;
    return { ...rest, _id: id } as Doc<T>;
  }

  private toRoom(doc: Doc<ChatroomTable> | null): ChatroomTable {
    if (!doc) return undefined as unknown as ChatroomTable;
    return { id: doc._id, name: doc.name, participantsIds: doc.participantsIds ?? [] };
  }

  private toUser(doc: Doc<UserTable> | null): UserTable {
    if (!doc) return undefined as unknown as UserTable;
    return { id: doc._id, name: doc.name, email: doc.email, participantsIds: doc.participantsIds ?? {} };
  }

  private toParticipant(doc: Doc<ParticipantTable> | null): ParticipantTable {
    if (!doc) return undefined as unknown as ParticipantTable;
    return { id: doc._id, userId: doc.userId, chatRoomId: doc.chatRoomId, isBot: doc.isBot };
  }

  private toMessage(doc: Doc<MessageTable>): MessageTable {
    return { id: doc._id, participantId: doc.participantId, roomId: doc.roomId, content: doc.content, created_at: doc.created_at };
  }

  private database(): Db {
    if (!this.db) throw new Error('Mongo: createDb() must be awaited before using the database');
    return this.db;
  }

  private users(): Collection<Doc<UserTable>> {
    return this.database().collection<Doc<UserTable>>(MONGO_COLLECTIONS.users);
  }

  private rooms(): Collection<Doc<ChatroomTable>> {
    return this.database().collection<Doc<ChatroomTable>>(MONGO_COLLECTIONS.rooms);
  }

  private participants(): Collection<Doc<ParticipantTable>> {
    return this.database().collection<Doc<ParticipantTable>>(MONGO_COLLECTIONS.participants);
  }

  private messages(): Collection<Doc<MessageTable>> {
    return this.database().collection<Doc<MessageTable>>(MONGO_COLLECTIONS.messages);
  }
}
