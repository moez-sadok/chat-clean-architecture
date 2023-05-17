import {
  ChatroomDto,
  MessageDto,
  ParticpantDto,
  UserDto,
} from '@chat-clean-architecture/chat/entreprise-business-rules/dtos';
//db Gateway
export interface IDataAccess {

  getUsers(): UserDto[];
  getUserById(userId: number): UserDto;
  addUser(user: UserDto): void;

  getChatRooms(): ChatroomDto[];
  getChatRoomsByUser(userId: number): ChatroomDto[];
  getChatRoomsById(roomId: number): ChatroomDto;
  addChatRoom(chatRoom: ChatroomDto): void;

  getMessagesByRoom(roomId: number): MessageDto[];
  addMessage(message: MessageDto): MessageDto;

  getParticpantByUserAndRoom(roomId: number, userId: number): ParticpantDto;
  addParticipant(participant: ParticpantDto): void;
  removeParticipant(participant: ParticpantDto): void;
}
