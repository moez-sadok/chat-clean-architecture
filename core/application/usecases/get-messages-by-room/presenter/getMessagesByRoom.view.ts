import { MessageOutputData } from "../interactor/getMessagesByRoom.response.data";
import { MessageViewModel } from "./getMessagesByRoom.view.model";

export interface IGetMessagesByRoomView {
  messages: MessageViewModel[];
  roomName: string;
  roomId: number;
  render(messages: MessageViewModel[]): void;
  setActiveRoom(id:number,name:string):void;
  receiveNewMessage(message: MessageOutputData): MessageOutputData ;
}

