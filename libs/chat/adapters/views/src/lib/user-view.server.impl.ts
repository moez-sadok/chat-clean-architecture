import {
  ChatDataViewModelDto,
  IChatWebViewScreen,
  MessageDataViewModelDto,
  RoomDataViewModelDto,
} from '@chat-clean-architecture/chat/adapters/presenters';

export class UserWebViewServerImpl implements IChatWebViewScreen {
  chatDataViewModelDto!: ChatDataViewModelDto;
  lastMessage!: MessageDataViewModelDto;

  displayChatRoomsMessages(messages: MessageDataViewModelDto[]): void {
    this.chatDataViewModelDto = {
      ...this.chatDataViewModelDto,
      activeRoomMessages: messages,
    };
  }

  displayChatPageView(chatView: ChatDataViewModelDto): void {
    this.chatDataViewModelDto = chatView;
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
