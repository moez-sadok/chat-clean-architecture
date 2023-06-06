import { ChatDataViewModelDto, MessageViewModel, RoomViewModel } from "./chat.data.view.model";

/* interface pattern : for the client view */
export interface IChatView {
  
  chatDataViewModelDto: ChatDataViewModelDto;

  displayChatPageRooms(chatView: ChatDataViewModelDto): void;
  displayChatRoomsMessages(messages: MessageViewModel[]): void;
  receiveMessage( message: MessageViewModel): MessageViewModel | null;
  setActiveRoom(room: RoomViewModel): void;
}
