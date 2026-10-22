import { IParticipant } from './participant';
import { IChatroom } from './chatroom';

export interface IMessage {
  getParticipant(): IParticipant;
  getChatRoom(): IChatroom;
  getContent(): string;
}
