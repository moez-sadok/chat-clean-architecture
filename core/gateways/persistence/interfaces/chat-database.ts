import { ChatroomTable } from '../tables/chatroom.table';
import { MessageTable } from '../tables/message.table';
import { ParticipantTable } from '../tables/participant.table';
import { UserTable } from '../tables/user.table';

//TODO (ISP)
/**
 * Gateway-level port over the raw storage (table models in, table models out).
 * Every operation is asynchronous: a real database (MongoDB, SQL, ...) can only
 * answer over the network, so the port must not promise a synchronous result.
 */
export interface IChatDatabase {
  /** Opens the connection (when there is one) and prepares the schema/indexes. */
  createDb(): Promise<void>;
  /** Releases the connection. In-memory adapters make it a no-op. */
  closeDb(): Promise<void>;

  //rooms
  getRoomById(roomId: number): Promise<ChatroomTable>;
  /** Batch read: one round trip instead of one per id. */
  getRoomsByIds(roomIds: number[]): Promise<ChatroomTable[]>;
  getChatRooms(): Promise<ChatroomTable[]>;
  insertChatRoom(chatRoom: ChatroomTable): Promise<ChatroomTable>;

  //messages
  insertMessage(message: MessageTable): Promise<MessageTable>;
  getMessagesByRoom(roomId: number, page?: number): Promise<MessageTable[]>;

  //participants
  getParticipantById(participantId: number): Promise<ParticipantTable>;
  /** Batch read: one round trip instead of one per id. */
  getParticipantsByIds(participantIds: number[]): Promise<ParticipantTable[]>;
  getParticipantsByRoom(id: number): Promise<ParticipantTable[]>;
  getParticipantsByUser(userId: number): Promise<ParticipantTable[]>;
  getParticipantByRoomAndUser(roomId: number, userId: number): Promise<ParticipantTable>;
  insertParticipant(participant: ParticipantTable): Promise<ParticipantTable>;
  removeParticipant(id: number): Promise<void>;

  //users
  getUserById(userId: number): Promise<UserTable>;
  /** Batch read: one round trip instead of one per id. */
  getUsersByIds(userIds: number[]): Promise<UserTable[]>;
  insertUser(user: UserTable): Promise<UserTable>;
  getUses(): Promise<UserTable[]>;
}
