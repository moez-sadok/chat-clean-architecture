import { IChatroom } from '../interfaces/chatroom';
import { IMessage } from '../interfaces/message';
import { IParticipant } from '../interfaces/participant';

export class Message implements IMessage {
  
  content?: string;
  chatroom?: IChatroom | null;
  participant?: IParticipant | null;

  constructor(content: string, chatRoom: IChatroom, participant: IParticipant) {
    this.content = content;
    this.participant = participant;
    this.chatroom = chatRoom;
  }

  getParticipant(): IParticipant {
    if (!this.participant) throw new Error('Not found participant for this message');
    return this.participant;
  }

  getchatRoom(): IChatroom {
    if (!this.chatroom) throw new Error('Not found chatroom for this message');
    return this.chatroom;
  }
  
  getcontent(): string {
    if (!this.content) throw new Error('Not found content for this message');
    return this.content;
  }
}
