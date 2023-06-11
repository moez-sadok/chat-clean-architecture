import { IChatPresenterOutputBoundary, MessageOutputData, RoomOutputData, UserOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';

export class ChatApiPresenterImpl implements IChatPresenterOutputBoundary {

  selectedUser(user: UserOutputData): UserOutputData {
    return user;
  }

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
