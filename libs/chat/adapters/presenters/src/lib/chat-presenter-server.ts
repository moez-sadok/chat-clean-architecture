import { IChatPresenterOutputBoundary, MessageOutputData, RoomOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';

export class ChatInMemoryServerImpl implements IChatPresenterOutputBoundary {

  receiveNewMessage(message: MessageOutputData): MessageOutputData {
    return message;
  }

  selectChatRoomsMessages(messages: MessageOutputData[], room: RoomOutputData): MessageOutputData[] {
    return messages;
  }

  selectedRoomsByUser(rooms: RoomOutputData[]): RoomOutputData[] {
    return rooms;
  }
}
