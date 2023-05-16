import { IChatroom } from './interfaces/chatroom';
import { IMessage } from './interfaces/message';
import { IParticpant } from './interfaces/participant';
import { Message } from './message.impl';

export class Chatroom implements IChatroom {
  private name: string;
  private participants: Record<string, IParticpant> = {};
  private messages: IMessage[] = [];

  constructor(name: string) {
    this.name = name;
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

  /** pattern basic methods */
  register(participant: IParticpant) {
    if (this.participants[participant.getUser().name])
      throw new Error('Can not register an existing participant');
    this.participants[participant.getUser().name] = participant;
    participant.enterChatRoom(this);
  }

  broadcastMessage(message: IMessage, from: IParticpant) {
    for (const key in this.participants) {
      if (this.participants[key].getUser().name !== from.getUser().name) {
        this.participants[key].receive(message);
      }
    }
    this.addMessage(message);
  }

  addMessage(message: IMessage) {
    //const newMessage :MessageDto = { from: from, message: message } as MessageDto
    this.messages.push(message);
  }

  /* */

  initChatRoom(parts: IParticpant[], messages: IMessage[]) {
    for (let i = 0; i < parts.length; i++) {
      this.register(parts[i]);
    }
    this.messages = messages;
  }

  leave(participant: IParticpant) {
    if (!this.participants[participant.getUser().name])
      throw new Error('Can not found participant to leave');
    const message = new Message('Leave the room', this, participant);
    this.broadcastMessage(message, participant);
    delete this.participants[participant.getUser().name];
  }
}
