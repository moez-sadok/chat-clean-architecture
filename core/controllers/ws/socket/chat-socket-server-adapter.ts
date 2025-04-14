import { Socket } from 'socket.io';
// import { MessageOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
// import { IChatClient } from '@chat-clean-architecture/chat/entreprise-business-rules/notifiyer';
import { IChatClient } from '../../../gateways/index';
import { MessageOutputData } from 'core/dtos/output.chat.data';
//Adapter pattern (object)
export class ChatServerSocketAdapter  implements IChatClient {

  constructor(private socket: Socket) {}

  getId(): number {
    return this.socket.handshake.auth['userId'];
  }

  receive(msg: string, roomId: number, receiverId: number, receiverName: string): void {
    const messageOutput: MessageOutputData = { chatRoomId: roomId, message: msg, authorName: receiverName, authorId: receiverId }
    this.socket.emit('msgToClient', messageOutput);
  }

}