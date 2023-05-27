import { IChatView, ChatDataViewModelDto, MessageDataViewModelDto, RoomDataViewModelDto } from "@chat-clean-architecture/chat/adapters/presenters";

export class UserWebViewClientImpl implements IChatView {

  chatDataViewModelDto!: ChatDataViewModelDto;

  displayChatRoomsMessages(messages: MessageDataViewModelDto[]): void {
    this.chatDataViewModelDto = { ...this.chatDataViewModelDto,activeRoomMessages: messages };
  }

  displayChatPageRooms(chatView: ChatDataViewModelDto): void {
    this.chatDataViewModelDto = chatView;
  }

  setActiveRoom(room: RoomDataViewModelDto) {
    this.chatDataViewModelDto = { ...this.chatDataViewModelDto, activeRoom: room};
  }

  receiveMessage(message: MessageDataViewModelDto): MessageDataViewModelDto | null {
    //the room is not selected
    if (message.roomId != this.chatDataViewModelDto.activeRoom?.roomId) {
      console.log('Send notif t the user is not inside the room')
      return null;
    }
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
