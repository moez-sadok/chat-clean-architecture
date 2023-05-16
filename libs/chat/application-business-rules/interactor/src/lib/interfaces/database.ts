import {
  ChatroomDto,
  MessageDto,
  ParticpantDto,
  UserDto,
} from '@chat-clean-architecture/chat/entreprise-business-rules/dtos';

export interface IDataAccess {
  //or Gateway

  getUsers(): UserDto[];
  getUserById(userId: number): UserDto;

  getChatRooms(): ChatroomDto[];

  getChatRoomsByUser(userId: number): ChatroomDto[];
  getChatRoomsById(roomId: number): ChatroomDto;
  getMessagesByRoom(roomId: number): MessageDto[];
  getParticpantByUserAndRoom(roomId: number, userId: number): ParticpantDto;

  addMessage(message: MessageDto): MessageDto;
  addParticipant(participant: ParticpantDto): void;
  addUser(user: UserDto): void;
  addChatRoom(chatRoom: ChatroomDto): void;

  removeParticipant(participant: ParticpantDto): void;
}
