import { IChatView, ChatDataViewModelDto, MessageViewModel, RoomViewModel, UserViewModel } from "@chat-clean-architecture/chat/adapters/presenters";

export class UserWebViewClientImpl implements IChatView {

  chatDataViewModelDto!: ChatDataViewModelDto;

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
