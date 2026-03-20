/******** Abstraction of mediator pattern */

import { IMessage } from './message';
import { IParticipant } from './participant';

// Mediator // Colleagues in Iparticipant
export interface IChatroom {
  //getters
  getName(): string;
  getId(): number;
  getParticipants(): Record<string, IParticipant>;
  getMessages(): IMessage[];
  //methods
  setParticipants(parts: IParticipant[]): void;
  setMessages(messages: IMessage[]): void;
  register(participant: IParticipant): void;
  broadcastMessage(message: IMessage, from: IParticipant): void;
  leave(participant: IParticipant): void;
}

// client main use example (one room):
// const yuri: UserDto = { name: 'Yuri' };
// const amelie: UserDto = { name: 'Ameli' };
// const yuriParticipantAmelie = new Participant(yuri);
// const amelieParticipantYuri = new Participant(amelie);

// const privateRoomYuriAmeli: Chatroom = new Chatroom('Yuri & Amelie');
// privateRoomYuriAmeli.register(yuriParticipantAmelie);
// privateRoomYuriAmeli.register(amelieParticipantYuri);

// yuriParticipantAmelie.send('are you good , what you have for the next week :p');
// amelieParticipantYuri.send('It is not your business');
