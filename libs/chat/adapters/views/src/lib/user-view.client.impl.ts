import { IChatWebViewScreen, ChatDataViewModelDto, MessageDataViewModelDto, RoomDataViewModelDto } from "@chat-clean-architecture/chat/adapters/presenters";

export class UserWebViewClientImpl implements IChatWebViewScreen {

  chatDataViewModelDto!: ChatDataViewModelDto;

  displayChatRoomsMessages(messages: MessageDataViewModelDto[]): void {
    this.chatDataViewModelDto = { ...this.chatDataViewModelDto,activeRoomMessages: messages };
  }

  displayChatPageView(chatView: ChatDataViewModelDto): void {
    this.chatDataViewModelDto = chatView;
  }

  setActiveRoom(room: RoomDataViewModelDto) {
    this.chatDataViewModelDto = { ...this.chatDataViewModelDto, activeRoom: room};
  }

  receiveMessage(message: MessageDataViewModelDto): MessageDataViewModelDto | null {
    console.log('receved message UserWebViewClientImpl', message);
    //the room is not selected
    if (message.roomId != this.chatDataViewModelDto.activeRoom?.roomId) return null;// or send notif
    //the room don't have a messages :
    if (!this.chatDataViewModelDto.activeRoomMessages) {
      this.chatDataViewModelDto = { ...this.chatDataViewModelDto, activeRoomMessages: [message] };
      return message;
    }
    //add message to existing
    const newMessages = [...this.chatDataViewModelDto.activeRoomMessages, message];
    this.chatDataViewModelDto = {...this.chatDataViewModelDto, activeRoomMessages: newMessages};
    return message;
  }
}
