import { IChatClient } from '../ports/chat-client';
import { INotifiyer } from '../ports/push-notif.port';
import { IChatroom } from '../interfaces/chatroom';
import { IMessage } from '../interfaces/message';
import { IParticpant } from '../interfaces/participant';
import { Message } from './message.impl';

export class Participant implements IParticpant {

  protected chatroom?: IChatroom | null;

  protected lastReceivedMessage?: IMessage | null;

  protected notifiyer?: INotifiyer | null;

  constructor(
    protected userName: string,
    protected userId: number,
    protected client?: IChatClient) { }

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

  getLastReceivedMessage(): IMessage {
    if (!this.lastReceivedMessage) throw new Error('No last recaived message found');
    return this.lastReceivedMessage;
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
    this.lastReceivedMessage = message;
    if (this.client) this.client.receive(
      message.getcontent(),
      message.getchatRoom().getId(),
      this.getUserId(),
      message.getParticipant().getUserName());
    //else
     //TO-Compleate
     // this.notifiyer?.notify(this.getUserId(), message.getcontent())
     //console.log('Participant user is not connected, send a push notif...', this.getUserId());
  }

  setClient(client: IChatClient) {
    this.client = client;
  }

}
