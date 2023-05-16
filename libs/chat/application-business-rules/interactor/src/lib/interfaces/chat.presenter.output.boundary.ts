import { MessageOutputData, RoomOutputData } from '../dtos/output.chat.data';

export interface IChatPresenterOutputBoundary {
  selectedRoomsByUser(rooms: RoomOutputData[]): void;
  selectChatRoomsMessages(messages: MessageOutputData[],room:RoomOutputData): void;
  receiveNewMessage(message: MessageOutputData): void;
}
