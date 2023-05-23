import { UserDto, ChatroomDto, MessageDto, ParticpantDto } from "@chat-clean-architecture/chat/entreprise-business-rules/dtos";
//db Gateway
export interface IDataAccess {

  getUserById(userId: number): UserDto;
  getChatRooms(): ChatroomDto[];
  getChatRoomsByUser(userId: number): ChatroomDto[];
  getChatRoomsById(roomId: number): ChatroomDto;
  getMessagesByRoom(roomId: number): MessageDto[];
  addMessage(message: MessageDto): MessageDto;
  getParticpantByUserAndRoom(roomId: number, userId: number): ParticpantDto;

  //addUser(user: UserDto): void;
  //addParticipant(participant: ParticpantDto): void;
  //removeParticipant(participant: ParticpantDto): void;
  //getUsers(): UserDto[];
  //addChatRoom(chatRoom: ChatroomDto): void;
}
