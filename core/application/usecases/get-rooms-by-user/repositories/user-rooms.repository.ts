import { ChatroomDto } from "../../../../dtos/models/chatroom.dto";

export interface IChatRoomsRepository {
  getChatRoomsByUser(userId: number): ChatroomDto[];
}