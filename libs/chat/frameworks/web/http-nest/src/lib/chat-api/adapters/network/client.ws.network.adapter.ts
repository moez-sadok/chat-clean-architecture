import { Socket } from 'socket.io';
import { ChatClientPortImpl, MessageOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
//Adapter pattern (class short, TO-CHECK decorator)
export class ChatClientNetworkAdapter extends ChatClientPortImpl {

  constructor(private socket: Socket) {
    super(socket.handshake.auth.userId, socket.handshake.auth.userName);
  }

  receive(message: MessageOutputData): void {
    this.socket.emit('msgToClient', message);
  }


}