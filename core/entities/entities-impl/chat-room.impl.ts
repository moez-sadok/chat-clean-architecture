import { IChatroom } from '../interfaces/chatroom';
import { IMessage } from '../interfaces/message';
import { IParticpant } from '../interfaces/participant';
import { Message } from './message.impl';

export class Chatroom implements IChatroom {

  private participants: Record<number, IParticpant> = {};
  private messages: IMessage[] = [];

  constructor(private name: string,private id:number) {}

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getParticipants(): Record<string, IParticpant> {
    return this.participants;
  }

  getMessages(): IMessage[] {
    return this.messages;
  }

  //setters
  setParticipants(parts: IParticpant[]): void {
    for (let i = 0; i < parts.length; i++) {
      this.register(parts[i]);
    }
  }

  setMessages(messages: IMessage[]): void {
    this.messages = messages;
  }

  /** pattern basic methods */
  register(participant: IParticpant) {
    if (this.participants[participant.getUserId()]) throw new Error('Can not register an existing participant');
    this.participants[participant.getUserId()] = participant;
    participant.enterChatRoom(this);
  }

  broadcastMessage(message: IMessage, from: IParticpant) {
    for (const key in this.participants) {
      if (this.participants[key].getUserId() !== from.getUserId()) {
        this.participants[key].receive(message);
      }
    }
    this.addMessage(message);
  }
  //

  addMessage(message: IMessage) {
    this.messages.push(message);
  }

  leave(participant: IParticpant) {
    if (!this.participants[participant.getUserId()]) throw new Error('Can not found participant to leave');
    const message = new Message('Leave the room', this, participant);
    this.broadcastMessage(message, participant);
    delete this.participants[participant.getUserId()];
  }
}
