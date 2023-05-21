import { MessageOutputData, RoomOutputData } from '../../dtos/output.chat.data';

export interface IChatPresenterOutputBoundary {
  selectedRoomsByUser(rooms: RoomOutputData[]): RoomOutputData[];
  selectChatRoomsMessages(messages: MessageOutputData[],room:RoomOutputData): MessageOutputData[];
  receiveNewMessage(message: MessageOutputData): MessageOutputData;
}
