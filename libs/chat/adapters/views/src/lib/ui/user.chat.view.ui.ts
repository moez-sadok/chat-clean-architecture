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
      console.warn('Send local notif to the user, he is not inside the selected room');
      return null;
    }
    const newMessages = [...this.chatDataViewModelDto.activeRoomMessages, message];
    this.chatDataViewModelDto = { ...this.chatDataViewModelDto, activeRoomMessages: newMessages };
    return message;
  }
}
