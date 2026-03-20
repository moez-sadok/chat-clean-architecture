import { ChatroomDto } from "../../dtos/models/chatroom.dto";
import { MessageDto } from "../../dtos/models/message.dto";
import { ParticipantDto } from "../../dtos/models/participant.dto";
import { UserDto } from "../../dtos/models/user.dto";
import { IChatRoomsRepository } from "../usecases/get-rooms-by-user/repositories/user-rooms.repository";

//Refactoring ... (ISP as IChatRoomsRepository)
export interface IChatRepository extends IChatRoomsRepository {

  getUserById(userId: number): UserDto | null ;
  
  getChatRooms(): ChatroomDto[];
  // getChatRoomsByUser(userId: number): ChatroomDto[];
  getChatRoomsById(roomId: number): ChatroomDto | null ;
  getMessagesByRoom(roomId: number): MessageDto[];
  addMessage(message: MessageDto): MessageDto;
  getParticpantByUserAndRoom(roomId: number, userId: number): ParticipantDto;

  addUser(user: UserDto): Promise<UserDto>;
  addParticipant(participant: ParticipantDto): void;
  removeParticipant(participant: ParticipantDto): void;
  getUsers(): UserDto[];
  addChatRoom(chatRoom: ChatroomDto): Promise<ChatroomDto>;
}
