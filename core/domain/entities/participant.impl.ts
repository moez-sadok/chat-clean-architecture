import { IChatClient } from '../ports/chat-client';
import { INotifier } from '../ports/push-notif.port';
import { IChatroom } from '../interfaces/chatroom';
import { IMessage } from '../interfaces/message';
import { IParticipant } from '../interfaces/participant';
import { Message } from './message.impl';

export class Participant implements IParticipant {

  protected chatroom?: IChatroom | null;

  protected lastReceivedMessage?: IMessage | null;

  // client: the participant's live connection, absent while offline.
  // notifier: how an offline participant is told about a message (R16).
  constructor(
    protected userName: string,
    protected userId: number,
    protected client?: IChatClient,
    protected notifier?: INotifier) { }

  getChatRoom(): IChatroom {
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
    if (!this.lastReceivedMessage) throw new Error('No last received message found');
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
    const author = message.getParticipant().getUserName();
    if (this.client) {
      this.client.receive(message.getContent(), message.getChatRoom().getId(), this.getUserId(), author);
    } else {
      this.notifier?.notify(this.getUserId(), message.getContent(), `${author} in ${message.getChatRoom().getName()}`);
    }
  }

  setClient(client: IChatClient) {
    this.client = client;
  }

}
