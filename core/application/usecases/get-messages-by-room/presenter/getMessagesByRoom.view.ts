import { IReactive } from "../../../../view/reactive";
import { MessageOutputData } from "../interactor/getMessagesByRoom.response.data";
import { MessageViewModel, RoomMessagesViewModel } from "./getMessagesByRoom.view.model";

export interface IGetMessagesByRoomView {
  messages: MessageViewModel[];
  roomName: string;
  roomId: number;
  render(messages: MessageViewModel[]): void;
  setActiveRoom(id:number,name:string):void;
  receiveNewMessage(message: MessageOutputData): MessageOutputData ;
}

export interface IGetMessagesByRoomReactiveView {
  // messages: IReactive<MessageViewModel[]>;
  // roomName: string;
  // roomId: number;
  getViewModel(): RoomMessagesViewModel;
  render(messages: MessageViewModel[]): void;
  setActiveRoom(id:number,name:string):void;
  receiveNewMessage(message: MessageOutputData): MessageOutputData ;
}
