import { IMessage } from '../interfaces/message';
import { Participant } from './participant.impl';

export class BotParticipant extends Participant {

  override receive(message: IMessage) {
    this.lastReceivedMessage = message;
    const msg = 'Hello ' + message.getParticipant().getUserName() + ', Who i can help you?';
    setTimeout(() => {
      this.send(msg);
    },100)
    
  }
}
