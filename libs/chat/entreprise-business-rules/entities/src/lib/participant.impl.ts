import { IChatroom } from './interfaces/chatroom';
import { IMessage } from './interfaces/message';
import { IParticpant } from './interfaces/participant';
import { Message } from './message.impl';

export class Participant implements IParticpant {

  private userName: string;
  private userId: number;
  private chatroom?: IChatroom | null;

  constructor(name: string, id: number) {
    this.userName = name;
    this.userId = id;
  }

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
    this.printTextMessage(message);
  }

  printTextMessage(messageData: IMessage) {
    console.log(messageData.getParticipant().getUserName() + ' to ' + this.userName + ': ' + messageData.getcontent());
  }
}
