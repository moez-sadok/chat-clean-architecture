
import { HttpClient } from '@angular/common/http';
import { IChatApiController } from '@chat-clean-architecture/chat/adapters/controllers';
import { IChatAppFacadePresenterOutput, RoomOutputData,
  MessageOutputData, UserOutputData, IChatClient
} from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { lastValueFrom, tap } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { ChatClientsocketkAdapter } from './chat-socket-client-adapter';
// Adapter pattern (Object) 
export class ChatControllerWsHttpClientAdapterImpl implements IChatApiController {

  constructor(
    private http: HttpClient,
    private presentator: IChatAppFacadePresenterOutput) { }

  getUserById(userId: number): Promise<UserOutputData | null> {
    const url = `${'api/chat-user'}/${userId}`;
    return lastValueFrom(this.http.get<UserOutputData | null>(url).pipe(
      tap(user => { if (user) this.presentator.selectedUser(user) })
    ));
  }

  getUserRooms(userId: number): Promise<RoomOutputData[]> {
    const url = `${'api/chat-user-rooms'}/${userId}`;
    return lastValueFrom(this.http.get<RoomOutputData[]>(url).pipe(
      tap(res => this.presentator.selectedRoomsByUser(res))
    ));
  }

  getRoomMessages(roomId: number, roomName: string, userId: number): Promise<MessageOutputData[]> {
    const url = 'api/chat-room-messages';
    const room = { userId: userId, roomId: roomId, roomName: roomName }; //as GetRoomMessagesInputData
    return lastValueFrom(this.http.get<MessageOutputData[]>(url, { params: room }).pipe(
      tap(res => this.presentator.selectChatRoomsMessages(res, room))
    ));
  }

  sendMessage(roomId: number, userId: number, message: string) {
    const url = 'api/send-message';
    const msg = { roomId: roomId, userId: userId, message: message };
    //TODO: change by post request or with ws: this.clientSocket.emit('msgToServer', messageData, (val: any) => {});  //for adding e2ee encrypt message in the client side controller
    return lastValueFrom(this.http.get<MessageOutputData>(url, { params: msg }).pipe(
      tap(resMsg => this.presentator.receiveNewMessage(resMsg))
    ));
  }

  async initUserConnection(userId: number): Promise<boolean> {
    const socket: Socket = io('ws://localhost:8080', {
      reconnectionDelayMax: 10000,
      auth: { userId: userId }
    });
    const clientSocket = new ChatClientsocketkAdapter(socket, this.presentator);
    return this.connectClient(clientSocket);
  }

  connectClient(client: IChatClient): Promise<boolean> {
    return new Promise((resolve) => {
      if (client) resolve(true); resolve(false);
    });
  }

  disconnectClient(userId: number): Promise<boolean> {
    return new Promise((resolve) => { resolve(true); });
  }

}
