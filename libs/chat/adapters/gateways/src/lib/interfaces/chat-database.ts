import { ChatroomTable } from '../tables/chatroom.table';
import { MessageTable } from '../tables/message.table';
import { ParticpantTable } from '../tables/participant.table';
import { UserTable } from '../tables/user.table';

export interface IChatDatabase {
  createDb(): void;
  insertMessage(message: MessageTable): MessageTable;
  getRoomById(roomId: number): ChatroomTable;
  getChatRooms(): ChatroomTable[];
  getParticipantsByUser(userId: number): ParticpantTable[];
  getParticipantByRoomAndUser(roomId: number, userId: number): ParticpantTable;
  getMessagesByRoom(roomId: number): MessageTable[];

  getParticipantById(participantId: number): ParticpantTable;
  getParticipantsByRoom(id: number): ParticpantTable[];
  getUserById(userId: number): UserTable;

  insertUser(user: UserTable): UserTable;
  insertChatRoom(chatRoom: ChatroomTable): ChatroomTable;
  insertParticipant(participant: ParticpantTable): ParticpantTable;
  getUses(): UserTable[];
  removeParticipant(id: number): void;
}
