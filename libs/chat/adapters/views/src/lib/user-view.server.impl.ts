import {
  ChatDataViewModelDto,
  IChatView,
  MessageDataViewModelDto,
  RoomDataViewModelDto,
} from '@chat-clean-architecture/chat/adapters/presenters';

export class UserWebViewServerImpl implements IChatView {
  
  chatDataViewModelDto!: ChatDataViewModelDto;
  lastMessage!: MessageDataViewModelDto;

  displayChatPageView(chatView: ChatDataViewModelDto): void {
    this.chatDataViewModelDto = chatView;
  }

  displayChatRoomsMessages(messages: MessageDataViewModelDto[]): void {
    this.chatDataViewModelDto = {
      ...this.chatDataViewModelDto,
      activeRoomMessages: messages,
    };
  }
  
  setActiveRoom(room: RoomDataViewModelDto) {
    this.chatDataViewModelDto = {
      ...this.chatDataViewModelDto,
      activeRoom: room,
    };
  }

  receiveMessage(message: MessageDataViewModelDto): MessageDataViewModelDto {
    this.lastMessage = message;
    return message;
  }
}
