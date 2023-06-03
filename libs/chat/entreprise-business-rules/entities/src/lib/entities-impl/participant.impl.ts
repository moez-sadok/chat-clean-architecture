import { IChatroom } from '../interfaces/chatroom';
import { IMessage } from '../interfaces/message';
import { IParticpant } from '../interfaces/participant';
import { Message } from './message.impl';
import { INotifilyer } from '@chat-clean-architecture/chat/entreprise-business-rules/notifiyer';

export class Participant implements IParticpant {

  private chatroom?: IChatroom | null;

  constructor(private userName: string,private userId: number, private notifiyer? : INotifilyer) {}

  getchatRoom(): IChatroom {
    if (!this.chatroom) throw new Error('Participant dont have a chatroom');
    return this.chatroom;
  }

  getUserId(): number {
    return this.userId;
  }

  getUserName(): string {
    return this.userName;
  }

  enterChatRoom(chatroom: IChatroom) {
    if (chatroom) this.chatroom = chatroom;
  }

  leaveChatRoom() {
    this.chatroom = null;
  }

  send(content: string) {
    if (!this.chatroom) throw new Error('Can not send a message: participant dont have a chatroom');
    const message = new Message(content, this.chatroom, this);
    this.chatroom.broadcastMessage(message, this);
  }

  receive(message: IMessage) {
    if(this.notifiyer) this.notifiyer.notifiy(
      message.getcontent(),
      message.getchatRoom().getId(),
      this.getUserId(),
      message.getParticipant().getUserName());
    else this.printTextMessage(message);
  }

  private printTextMessage(messageData: IMessage) {
    console.log(messageData.getParticipant().getUserName() + ' to ' + this.userName + ': ' + messageData.getcontent());
  }
}
