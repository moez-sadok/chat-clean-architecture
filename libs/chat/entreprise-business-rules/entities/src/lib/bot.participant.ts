import { IMessage } from './interfaces/message';
import { Participant } from './participant.impl';

export class BotParticipant extends Participant {

  override receive(message: IMessage) {
    const msg = 'Hello ' + message.getParticipant().getUser().name + ', Who i can help you?';
    this.send(msg);
  }
}
