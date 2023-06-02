import { ChatDataViewModelDto, MessageDataViewModelDto, RoomDataViewModelDto } from "./chat.data.view.model";

/* interface pattern : for the client view */
export interface IChatView {
  
  chatDataViewModelDto: ChatDataViewModelDto;

  displayChatPageRooms(chatView: ChatDataViewModelDto): void;
  displayChatRoomsMessages(messages: MessageDataViewModelDto[]): void;
  receiveMessage( message: MessageDataViewModelDto): MessageDataViewModelDto | null;
  setActiveRoom(room: RoomDataViewModelDto): void;
}
