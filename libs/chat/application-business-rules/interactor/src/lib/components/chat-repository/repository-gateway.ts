import { ChatroomDto } from "../../dtos/models/chatroom.dto";
import { MessageDto } from "../../dtos/models/message.dto";
import { ParticpantDto } from "../../dtos/models/participant.dto";
import { UserDto } from "../../dtos/models/user.dto";

//chat repository
export interface IChatRepository {

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
