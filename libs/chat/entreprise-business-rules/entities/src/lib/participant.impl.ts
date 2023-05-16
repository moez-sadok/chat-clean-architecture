import { UserDto } from '@chat-clean-architecture/chat/entreprise-business-rules/dtos';
import { IChatroom } from './interfaces/chatroom';
import { IMessage } from './interfaces/message';
import { IParticpant } from './interfaces/participant';
import { Message } from './message.impl';

export class Participant implements IParticpant {
  
  user: UserDto;
  chatroom?: IChatroom | null;

  constructor(user: UserDto) {
    this.user = user;
  }

  getchatRoom(): IChatroom {
    if (!this.chatroom) throw new Error('Participant dont have a chatroom');
    return this.chatroom;
  }

  getUser(): UserDto {
    return this.user;
  }

  enterChatRoom(chatroom: IChatroom) {
    if (chatroom) this.chatroom = chatroom;
  }

  leaveChatRoom() {
    this.chatroom = null;
  }

  send(content: string) {
    if (!this.chatroom)throw new Error( 'Can not send a message: participant dont have a chatroom');
    const message = new Message(content, this.chatroom, this);
    this.chatroom.broadcastMessage(message, this);
  }

  receive(message: IMessage) {
    this.printTextMessage(message);
  }

  printTextMessage(messageData: IMessage) {
    console.log(messageData.getParticipant().getUser().name +
        ' to ' + this.user.name + ': ' +messageData.getcontent());
  }
}
