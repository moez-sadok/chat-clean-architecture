import { ChatroomTable } from '../tables/chatroom.table';
import { MessageTable } from '../tables/message.table';
import { ParticipantTable } from '../tables/participant.table';
import { UserTable } from '../tables/user.table';

//TODO (ISP)
export interface IChatDatabase {
  createDb(): void;
  //rooms
  getRoomById(roomId: number): ChatroomTable;
  getChatRooms(): ChatroomTable[];
  insertChatRoom(chatRoom: ChatroomTable): ChatroomTable;

  //messages
  insertMessage(message: MessageTable): MessageTable;
  getMessagesByRoom(roomId: number,page?: number): MessageTable[];

  //participants
  getParticipantById(participantId: number): ParticipantTable;
  getParticipantsByRoom(id: number): ParticipantTable[];
  getParticipantsByUser(userId: number): ParticipantTable[];
  getParticipantByRoomAndUser(roomId: number, userId: number): ParticipantTable;
  insertParticipant(participant: ParticipantTable): ParticipantTable;
  removeParticipant(id: number): void;

  //users
  getUserById(userId: number): UserTable;
  insertUser(user: UserTable): UserTable;
  getUses(): UserTable[];
}
