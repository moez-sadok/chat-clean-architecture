import { Socket } from 'socket.io';
import { ChatClientPortImpl, MessageOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';

export class ChatClientNetworkAdapter extends ChatClientPortImpl {

  constructor(private socket: Socket) {
    //console.log('socket client server auth',socket.handshake.auth);
    super(socket.handshake.auth.userId, socket.handshake.auth.userName);
  }

  receive(message: MessageOutputData): void {
    this.socket.emit('msgToClient', message);
  }


}