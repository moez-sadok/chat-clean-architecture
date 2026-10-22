import { ChatroomDto } from "../../dtos/models/chatroom.dto";
import { MessageDto } from "../../dtos/models/message.dto";
import { ParticipantDto } from "../../dtos/models/participant.dto";
import { UserDto } from "../../dtos/models/user.dto";
import { IChatRoomsRepository } from "../usecases/get-rooms-by-user/repositories/user-rooms.repository";

//Refactoring ... (ISP as IChatRoomsRepository)
//Asynchronous by contract: the application must not assume the store answers in
//process (see IChatDatabase).
export interface IChatRepository extends IChatRoomsRepository {

  getUserById(userId: number): Promise<UserDto | null>;

  getChatRooms(): Promise<ChatroomDto[]>;
  // getChatRoomsByUser(userId: number): Promise<ChatroomDto[]>;
  getChatRoomsById(roomId: number): Promise<ChatroomDto | null>;
  getMessagesByRoom(roomId: number): Promise<MessageDto[]>;
  addMessage(message: MessageDto): Promise<MessageDto>;
  getParticpantByUserAndRoom(roomId: number, userId: number): Promise<ParticipantDto>;

  addUser(user: UserDto): Promise<UserDto>;
  addParticipant(participant: ParticipantDto): Promise<void>;
  removeParticipant(participant: ParticipantDto): Promise<void>;
  getUsers(): Promise<UserDto[]>;
  addChatRoom(chatRoom: ChatroomDto): Promise<ChatroomDto>;
}
