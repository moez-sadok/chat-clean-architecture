// import { UserOutputData } from "@chat-clean-architecture/chat/application-business-rules/interactor";
import { UserOutputData } from "../../dtos/output.chat.data";
import { RoomViewModel } from "../../application/usecases/get-rooms-by-user";
import { ChatDataViewModelDto } from "./chat.data.view.model";
import { MessageViewModel } from "../../application/usecases/get-messages-by-room";

/* interface pattern : for the client view as a facade */
export interface IChatView {

  chatDataViewModelDto: ChatDataViewModelDto;

  setActiveUser(user: UserOutputData): void;
  // displayChatPageRooms(rooms: RoomViewModel[]): void;
  // displayChatRoomsMessages(messages: MessageViewModel[]): void;
  receiveMessage( message: MessageViewModel): MessageViewModel | null;
  // setActiveRoom(room: RoomViewModel): void;
  switchView(): void;
}
