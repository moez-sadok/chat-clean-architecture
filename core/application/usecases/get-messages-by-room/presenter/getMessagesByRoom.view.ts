import { IReactive } from "../../../../view/reactive";
import { MessageOutputData } from "../interactor/getMessagesByRoom.response.data";
import { MessageViewModel, RoomMessagesViewModel } from "./getMessagesByRoom.view.model";

interface IRoomMessagesView {
  render(messages: MessageViewModel[]): void;
  setActiveRoom(id: number, name: string): void;
  receiveNewMessage(message: MessageOutputData): MessageOutputData;
  getViewModel(): RoomMessagesViewModel;
}

export interface IGetMessagesByRoomView extends IRoomMessagesView {
  readonly vm: RoomMessagesViewModel;
}

export interface IGetMessagesByRoomReactiveView extends IRoomMessagesView {
  readonly vm: IReactive<RoomMessagesViewModel>;
}
