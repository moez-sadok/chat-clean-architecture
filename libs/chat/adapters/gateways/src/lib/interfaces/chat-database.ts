import { ChatroomTable } from '../tables/chatroom.table';
import { MessageTable } from '../tables/message.table';
import { ParticpantTable } from '../tables/participant.table';
import { UserTable } from '../tables/user.table';

export interface IChatDatabase {
  createDb(): void;

  insertMessage(message: MessageTable): MessageTable;
  insertParticipant(participant: ParticpantTable): ParticpantTable;
  insertUser(user: UserTable): UserTable;
  insertChatRoom(chatRoom: ChatroomTable): ChatroomTable;

  getRoomById(roomId: number): ChatroomTable;
  getMessageByRoom(roomId: number): MessageTable[];

  getParticipantById(participantId: number): ParticpantTable;
  getParticipantsByRoom(id: number): ParticpantTable[];
  getParticipantsByUser(userId: number): ParticpantTable[];
  getParticipantByRoomAndUser(roomId: number, userId: number): ParticpantTable;

  getUserById(userId: number): UserTable;
  getUses(): UserTable[];

  getChatRooms(): ChatroomTable[];

  removeParticipant(id: number): void;
}
