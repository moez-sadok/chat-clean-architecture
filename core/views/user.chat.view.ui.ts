import { IChatView, ChatDataViewModelDto, UserViewModel, MessageViewModel, RoomViewModel } from "../presenter";

export class UserWebViewClientImpl implements IChatView {

  chatDataViewModelDto!: ChatDataViewModelDto;

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

  displayChatPageRooms(rooms: RoomViewModel[]): void {
    this.chatDataViewModelDto = {...this.chatDataViewModelDto, rooms : rooms};
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
