
import { HttpClient } from '@angular/common/http';
import { IChatApiController } from '@chat-clean-architecture/chat/adapters/controllers';
import { IChatPresenterOutputBoundary, RoomOutputData, MessageOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { lastValueFrom, tap } from 'rxjs';
import { Socket, io } from 'socket.io-client';

export class ChatControllerWsHttpClientAdapterImpl implements IChatApiController {

  private clientSocket!: Socket;

  constructor(
    private http: HttpClient,
    private presentator: IChatPresenterOutputBoundary) { }

  initUserConnection(userId: number): Promise<boolean> {
    this.clientSocket = io('ws://localhost:8080', {
      reconnectionDelayMax: 10000,
      auth: { userId: userId }
    });
    this.listenReceiveMessage();
    this.getUserRooms(userId);
    return new Promise((resolve) => {
      resolve(true);
    });
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
    const msg = {  roomId: roomId,userId: userId, message: message };
    //TODO: change by post request
    return lastValueFrom(this.http.get<MessageOutputData>(url, { params: msg }).pipe(
      tap(resMsg => this.presentator.receiveNewMessage(resMsg))
    ));
    //or with ws: this.clientSocket.emit('msgToServer', messageData, (val: any) => {});
  }

  private listenReceiveMessage() {
    this.clientSocket.on('msgToClient', (message) => {
      this.presentator.receiveNewMessage(message);
    });
  }

}
