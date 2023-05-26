import { IChatPresenterOutputBoundary, IChatServerPort, MessageOutputData, RoomOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { Inject, Optional } from '@nestjs/common';
// other solution: create a api (ws/http) view component to response from server 
export class ChatPresenterWsImpl implements IChatPresenterOutputBoundary {

  constructor( @Optional() @Inject('CHAT_SERVER_PROVIDER') 
      private chatServer: IChatServerPort) {}

  selectedRoomsByUser(rooms: RoomOutputData[]): RoomOutputData[] {
    return rooms;
  }

  selectChatRoomsMessages(messages: MessageOutputData[], room: RoomOutputData): MessageOutputData[] {
    return messages;
  }

  receiveNewMessage(message: MessageOutputData): MessageOutputData {
    this.chatServer.broadcast(message);
    return message;
  }

}