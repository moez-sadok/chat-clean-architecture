import { UserOutputData } from "@chat-clean-architecture/chat/application-business-rules/interactor";
import { ChatDataViewModelDto, MessageViewModel, RoomViewModel } from "./chat.data.view.model";

/* interface pattern : for the client view */
export interface IChatView {

  chatDataViewModelDto: ChatDataViewModelDto;

  setActiveUser(user: UserOutputData): void;
  displayChatPageRooms(rooms: RoomViewModel[]): void;
  displayChatRoomsMessages(messages: MessageViewModel[]): void;
  receiveMessage( message: MessageViewModel): MessageViewModel | null;
  setActiveRoom(room: RoomViewModel): void;
  switchView(): void;
}
