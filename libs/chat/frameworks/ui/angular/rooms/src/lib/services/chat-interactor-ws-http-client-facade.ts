
import { HttpClient } from '@angular/common/http';
import { MessageDataViewModelDto } from '@chat-clean-architecture/chat/adapters/presenters';
import { GetRoomsByUserInputData, GetRoomMessagesInputData, SendMessageInputData, IChatControllerInputBoundary, IChatPresenterOutputBoundary, RoomOutputData, MessageOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { lastValueFrom, tap } from 'rxjs';
import { Socket, io } from 'socket.io-client';

export class ChatInteractorWsHttpClientFacadeImpl implements IChatControllerInputBoundary {

  private clientSocket!: Socket;

  constructor(
    private http: HttpClient, 
    private presentator: IChatPresenterOutputBoundary) { }

  getRoomsByUser(user: GetRoomsByUserInputData): Promise<RoomOutputData[]> {
    const url = `${'api/chat-user-rooms'}/${user.userId}`;
    return lastValueFrom(this.http.get<RoomOutputData[]>(url).pipe(
      tap(res => this.presentator.selectedRoomsByUser(res))
    ));
  }

  getChatRoomsMessages(room: GetRoomMessagesInputData): Promise<MessageOutputData[]>  {
    this.joinRoom(room.roomId);
    const url = `${'api/chat-room-messages'}/${room.roomId}`;
    return lastValueFrom(this.http.get<MessageOutputData[]>(url, 
      { params: { userId: room.userId, roomId : room.roomId, roomName: room.roomName } }).pipe(
        tap(res => this.presentator.selectChatRoomsMessages(res,room))
      ));
  }

  connectUser(userId: number): Promise<boolean> {
    this.clientSocket = io('ws://localhost:8080', {
      reconnectionDelayMax: 10000,
      auth: { userId: userId }
    });
    this.listenReceiveMessage();
    this.listenerConnectUser();
    return new Promise((resolve) => {
      //@ts-ignore
      resolve(true);
    }); 
  }

  private listenerConnectUser(){
    this.clientSocket.on("connect", () => {
      console.log('is connected',this.clientSocket); // x8WIv7-mJelg7on_ALbx
    });
  }

  private listenReceiveMessage(){
    this.clientSocket.on('msgToClient', (message) => {
      this.presentator.receiveNewMessage(message);
    });
  }

  sendMessage(message: SendMessageInputData): Promise<MessageDataViewModelDto> {
    const msg = this.clientSocket.emit('msgToServer', message, (val: any) => {
      console.log('sendMessage',val);
    });
    return new Promise((resolve) => {
      //@ts-ignore
      resolve(msg);
    });
  }

  private joinRoom(roomId: number) {
    this.clientSocket.emit('joinRoom', roomId);
  }

  private leaveRoom(roomId: number) {
    this.clientSocket.emit('leaveRoom', roomId);
  } 

}
