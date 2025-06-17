import { Socket } from 'socket.io';
import { IChatClient } from '../../../gateways/index';
import { MessageOutputData } from '../../../application/usecases/get-messages-by-room';
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