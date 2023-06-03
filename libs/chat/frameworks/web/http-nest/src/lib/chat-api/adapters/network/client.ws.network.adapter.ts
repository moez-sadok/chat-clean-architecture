import { Socket } from 'socket.io';
import { ChatClientPortImpl, MessageOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';

export class ChatClientNetworkAdapter extends ChatClientPortImpl {

  constructor(private socket: Socket) {
    super(socket.handshake.auth.userId);
  }

  emit(data: MessageOutputData): void {
    this.socket.emit('msgToClient', data);
  }

}