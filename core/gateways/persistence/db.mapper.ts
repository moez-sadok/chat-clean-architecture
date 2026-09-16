import { ChatDataSerializer } from './utils/data.serializer';
import { IChatDatabase } from './interfaces/chat-database';
import { UserChatRoomDto } from '../../application/usecases/get-rooms-by-user/repositories/user-rooms.repository';
import { IChatRepository } from '../../application/ports/chat-repository';
import { ChatroomDto } from '../../dtos/models/chatroom.dto';
import { MessageDto } from '../../dtos/models/message.dto';
import { ParticipantDto } from '../../dtos/models/participant.dto';
import { UserDto } from '../../dtos/models/user.dto';

export class DataBaseMapper implements IChatRepository {
  private dbSerializer: ChatDataSerializer;

  constructor(private db: IChatDatabase) {
    this.dbSerializer = new ChatDataSerializer(db);
  }

  /** insertions */
  async addMessage(message: MessageDto): Promise<MessageDto> {
    if (message.from.id == undefined) throw new Error('Add message miss attrs: from');
    if (message.room.id == undefined) throw new Error('Add message miss attrs: room');
    const tabelMessage = this.dbSerializer.desirializeMessage({
      ...message,
      date: new Date(),
    });
    const newMessage = await this.db.insertMessage(tabelMessage);
    return { ...message, id: newMessage.id };
  }

  /** getters / selects */
  async getUserById(userId: number): Promise<UserDto | null> {
    const dbUser = await this.db.getUserById(userId);
    if (dbUser) return this.dbSerializer.serializeUser(dbUser);
    else return null;
  }

  async getChatRooms(): Promise<ChatroomDto[]> {
    const rooms = await this.db.getChatRooms();
    return Promise.all(rooms.map(roomTable => this.dbSerializer.serializeRoom(roomTable)));
  }

  async getChatRoomsByUser(userId: number): Promise<UserChatRoomDto[]> {
    if (userId === null || userId === undefined)
      throw new Error(' Get ChatRooms By User : user not found');
    const currUser = await this.db.getUserById(userId);
    if (!currUser.participantsIds) return [];
    //3 reads whatever the number of rooms, and no participant hydration (ISP)
    const userParts = await this.db.getParticipantsByIds(Object.values(currUser.participantsIds));
    const roomIds = [...new Set(userParts.map((p) => p.chatRoomId))];
    const rooms = await this.db.getRoomsByIds(roomIds);
    return rooms.map((r) => ({ id: r.id, name: r.name }));
  }

  async getMessagesByRoom(roomId: number): Promise<MessageDto[]> {
    const [roomTable, messages] = await Promise.all([
      this.db.getRoomById(roomId),
      this.db.getMessagesByRoom(roomId)
    ]);
    if (!roomTable) return [];
    //the room is serialized once for the whole page of messages (no N+1)
    const roomDto = await this.dbSerializer.serializeRoomWithoutMessages(roomTable);
    return this.dbSerializer.serializeMessagesOfRoom(messages, roomDto);
  }

  async getParticpantByUserAndRoom(roomId: number, userId: number): Promise<ParticipantDto> {
    const partTable = await this.db.getParticipantByRoomAndUser(roomId, userId);
    return this.dbSerializer.serializeParticipant(partTable);
  }

  async getChatRoomsById(roomId: number): Promise<ChatroomDto | null> {
    const dbRoom = await this.db.getRoomById(roomId);
    if (dbRoom) return this.dbSerializer.serializeRoom(dbRoom);
    return null;
  }

  async getUsers(): Promise<UserDto[]> {
    const users = await this.db.getUses();
    return users.map((ut) => this.dbSerializer.serializeUser(ut));
  }

  async addChatRoom(chatRoom: ChatroomDto): Promise<ChatroomDto> {
    // const tabelroom = this.dbSerializer.desirializeRoom({ ...chatRoom });
    const dbRoom = await this.db.insertChatRoom({ name: chatRoom.name, id: chatRoom.id });
    return this.dbSerializer.serializeRoom(dbRoom);
  }

  async addParticipant(participant: ParticipantDto): Promise<void> {
    if (participant.chatroom?.id === undefined || participant.user.id === undefined)
      throw new Error('Add participant miss attrs');
    const tabelPart = this.dbSerializer.desirializeParticipant(participant);
    await this.db.insertParticipant(tabelPart);
  }

  async removeParticipant(participant: ParticipantDto): Promise<void> {
    if (!participant.id) throw new Error("Can't remouve unfoud participant");
    await this.db.removeParticipant(participant.id);
  }

  async addUser(user: UserDto): Promise<UserDto> {
    if (!user?.id) throw new Error('Add user miss attrs');
    const tabelUser = this.dbSerializer.deserializeUser({ ...user });
    const userTable = await this.db.insertUser(tabelUser);
    return this.dbSerializer.serializeUser(userTable);
  }
}
