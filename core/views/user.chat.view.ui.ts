import { RoomViewModel } from "../application/usecases/get-rooms-by-user";
import { IChatView, ChatDataViewModelDto, UserViewModel, MessageViewModel } from "../presenter";

export class UserWebViewClientImpl implements IChatView {

  chatDataViewModelDto!: ChatDataViewModelDto;

  // displayChatPageRooms(rooms: RoomViewModel[]): void {
  //   this.chatDataViewModelDto = {...this.chatDataViewModelDto, rooms : rooms};
  // }

  switchView(): void {
    const style = this.chatDataViewModelDto.defaultView === 'material' ? 'native' : 'material';
    this.chatDataViewModelDto = { ...this.chatDataViewModelDto, defaultView: style };
  }

  setActiveUser(user: UserViewModel): void {
    this.chatDataViewModelDto = { ...this.chatDataViewModelDto, activeUser: user };
  }

  displayChatRoomsMessages(messages: MessageViewModel[]): void {
    this.chatDataViewModelDto = { ...this.chatDataViewModelDto, activeRoomMessages: messages };
  }

  setActiveRoom(room: RoomViewModel) {
    this.chatDataViewModelDto = { ...this.chatDataViewModelDto, activeRoom: room };
  }

  receiveMessage(message: MessageViewModel): MessageViewModel | null {
    const newMessages = [...this.chatDataViewModelDto.activeRoomMessages, message];
    this.chatDataViewModelDto = { ...this.chatDataViewModelDto, activeRoomMessages: newMessages };
    return message;
  }
}
