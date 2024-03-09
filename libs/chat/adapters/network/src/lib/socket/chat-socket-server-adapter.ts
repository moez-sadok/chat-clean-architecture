import { Socket } from 'socket.io';
import { MessageOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { ChatClientPortImpl } from '../chat-client.port.impl';
//Adapter pattern (class short, TO-CHECK decorator)
// ChatClientServerAdapter 
export class ChatClientServerAdapter extends ChatClientPortImpl {

  constructor(private socket: Socket) {
    super(socket.handshake.auth['userId'], socket.handshake.auth['userName']);
  }

  override receive(msg: string, roomId: number, receiverId: number, receiverName: string): void {
    const messageOutput: MessageOutputData = { chatRoomId: roomId, message: msg, authorName: receiverName }
    this.socket.emit('msgToClient', messageOutput);
  }

}