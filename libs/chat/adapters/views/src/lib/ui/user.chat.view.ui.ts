import { IChatView, ChatDataViewModelDto, MessageViewModel, RoomViewModel } from "@chat-clean-architecture/chat/adapters/presenters";
import { UserOutputData } from "@chat-clean-architecture/chat/application-business-rules/interactor";

export class UserWebViewClientImpl implements IChatView {


  chatDataViewModelDto!: ChatDataViewModelDto;

  setActiveUser(user: UserOutputData): void {
    this.chatDataViewModelDto = { ...this.chatDataViewModelDto, activeUser: user };
  }

  displayChatRoomsMessages(messages: MessageViewModel[]): void {
    this.chatDataViewModelDto = { ...this.chatDataViewModelDto, activeRoomMessages: messages };
  }

  displayChatPageRooms(rooms: RoomViewModel[]): void {
    this.chatDataViewModelDto = {...this.chatDataViewModelDto, rooms : rooms};
  }

  setActiveRoom(room: RoomViewModel) {
    this.chatDataViewModelDto = { ...this.chatDataViewModelDto, activeRoom: room };
  }

  receiveMessage(message: MessageViewModel): MessageViewModel | null {
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
    this.chatDataViewModelDto = { ...this.chatDataViewModelDto, activeRoomMessages: newMessages };
    return message;
  }
}
