import { IParticpant } from './participant';
import { IChatroom } from './chatroom';

export interface IMessage {
  getParticipant(): IParticpant;
  getchatRoom(): IChatroom;
  getcontent(): string;
}
