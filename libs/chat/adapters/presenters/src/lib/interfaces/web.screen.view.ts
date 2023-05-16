import { ChatDataViewModelDto, MessageDataViewModelDto, RoomDataViewModelDto } from "../dtos/chat.data.view.model";

/* interface pattern : for the clien view */
export interface IChatWebViewScreen {
  
  chatDataViewModelDto: ChatDataViewModelDto;

  displayChatPageView(chatView: ChatDataViewModelDto): void;
  displayChatRoomsMessages(messages: MessageDataViewModelDto[]): void;
  receiveMessage( message: MessageDataViewModelDto): MessageDataViewModelDto | null;
  setActiveRoom(room: RoomDataViewModelDto): void;
}
