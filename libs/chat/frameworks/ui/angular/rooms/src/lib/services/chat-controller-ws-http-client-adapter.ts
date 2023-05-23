
import { HttpClient } from '@angular/common/http';
import { IChatApiController } from '@chat-clean-architecture/chat/adapters/controllers';
import { IChatPresenterOutputBoundary, RoomOutputData, MessageOutputData, SendMessageInputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
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
    this.listenerConnectUser();
    //TODO : return the userdto and resolve it inside the on.connect
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
    this.joinRoom(roomId);
    const url = `${'api/chat-room-messages'}/${roomId}`;
    const room = { userId: userId, roomId: roomId, roomName: roomName }; //as GetRoomMessagesInputData
    return lastValueFrom(this.http.get<MessageOutputData[]>(url, { params: room }).pipe(
      tap(res => this.presentator.selectChatRoomsMessages(res, room))
    ));
  }

  sendMessage(roomId: number, userId: number, message: string) {
    const messageData: SendMessageInputData = { roomId: roomId, userId: userId, message: message }
    this.clientSocket.emit('msgToServer', messageData, (val: any) => {
      console.log('sendMessage', val);
    });
  }

  //
  private listenerConnectUser() {
    this.clientSocket.on("connect", () => {
      console.log('is connected', this.clientSocket.id);
    });
  }

  private listenReceiveMessage() {
    this.clientSocket.on('msgToClient', (message) => {
      this.presentator.receiveNewMessage(message);
    });
  }

  private joinRoom(roomId: number) {
    this.clientSocket.emit('joinRoom', roomId);
  }

  private leaveRoom(roomId: number) {
    this.clientSocket.emit('leaveRoom', roomId);
  }

}
