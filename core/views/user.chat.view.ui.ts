import { IChatView, ChatDataViewModelDto, UserViewModel } from "../presenter";

//Refactoring ... 
export class UserWebViewClientImpl implements IChatView {

  chatDataViewModelDto!: ChatDataViewModelDto;

  switchView(): void {
    const style = this.chatDataViewModelDto.defaultView === 'material' ? 'native' : 'material';
    this.chatDataViewModelDto = { ...this.chatDataViewModelDto, defaultView: style };
  }

  setActiveUser(user: UserViewModel): void {
    this.chatDataViewModelDto = { ...this.chatDataViewModelDto, activeUser: user };
  }


  // receiveMessage(message: MessageViewModel): MessageViewModel | null {
  //   console.log('check calling comp view?')
  //   // const newMessages = [...this.chatDataViewModelDto.activeRoomMessages, message];
  //   // this.chatDataViewModelDto = { ...this.chatDataViewModelDto, activeRoomMessages: newMessages };
  //   return message;
  // }

  // displayChatPageRooms(rooms: RoomViewModel[]): void {
  //   this.chatDataViewModelDto = {...this.chatDataViewModelDto, rooms : rooms};
  // }

  // displayChatRoomsMessages(messages: MessageViewModel[]): void {
  //   this.chatDataViewModelDto = { ...this.chatDataViewModelDto, activeRoomMessages: messages };
  // }


  // setActiveRoom(room: RoomViewModel) {
  //   this.chatDataViewModelDto = { ...this.chatDataViewModelDto, activeRoom: room };
  // }

}
