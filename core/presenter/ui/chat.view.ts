import { UserOutputData } from "../../dtos/output.chat.data";
import { ChatDataViewModelDto } from "./chat.data.view.model";

/* interface pattern : for the client view as a facade for page - to be removed */
export interface IChatView {

  chatDataViewModelDto: ChatDataViewModelDto;

  setActiveUser(user: UserOutputData): void;
  // displayChatPageRooms(rooms: RoomViewModel[]): void;
  // displayChatRoomsMessages(messages: MessageViewModel[]): void;
  // receiveMessage( message: MessageViewModel): MessageViewModel | null;
  // setActiveRoom(room: RoomViewModel): void;
  switchView(): void;
}
