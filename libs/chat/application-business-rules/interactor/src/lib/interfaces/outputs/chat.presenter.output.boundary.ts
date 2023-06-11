import { MessageOutputData, RoomOutputData, UserOutputData } from '../../dtos/output.chat.data';

export interface IChatPresenterOutputBoundary {
  selectedUser(user: UserOutputData): UserOutputData;
  selectedRoomsByUser(rooms: RoomOutputData[]): RoomOutputData[];
  selectChatRoomsMessages(messages: MessageOutputData[],room:RoomOutputData): MessageOutputData[];
  receiveNewMessage(message: MessageOutputData): MessageOutputData;
}
