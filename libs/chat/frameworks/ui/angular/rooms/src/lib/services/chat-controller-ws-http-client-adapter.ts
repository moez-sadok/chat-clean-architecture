
import { HttpClient } from '@angular/common/http';
import { IChatApiController } from '@chat-clean-architecture/chat/adapters/controllers';
import { IChatPresenterOutputBoundary, RoomOutputData, MessageOutputData, UserOutputData, IChatClient } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { lastValueFrom, tap } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { ChatClientsocketkAdapter } from './chat-socket-client-adapter';

export class ChatControllerWsHttpClientAdapterImpl implements IChatApiController {

  private clientSocket!: IChatClient;

  constructor(
    private http: HttpClient,
    private presentator: IChatPresenterOutputBoundary) { }

  connectClient(client: IChatClient): Promise<boolean> {
    return new Promise((resolve) => {
      if (client) resolve(true);
      else resolve(false);
    });
  }

  disconnectClient(userId: number): Promise<boolean> {
    console.log('disconnectClient ...', userId);
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  async initUserConnection(userId: number): Promise<boolean> {
    const user = await this.getUserById(userId);
    if (user) {
      this.getUserRooms(userId);
      const socket: Socket = io('ws://localhost:8080', {
        reconnectionDelayMax: 10000,
        auth: { userId: user.id, userName: user.name }
      });
      this.clientSocket = new ChatClientsocketkAdapter(socket, this.presentator);
      return this.connectClient(this.clientSocket);
    }
    return new Promise((resolve) => { resolve(false) });
  }

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
    //TODO: change by post request or with ws: this.clientSocket.emit('msgToServer', messageData, (val: any) => {});
    return lastValueFrom(this.http.get<MessageOutputData>(url, { params: msg }).pipe(
      tap(resMsg => this.presentator.receiveNewMessage(resMsg))
    ));
  }

  //TODO add try catch
  // const socket: Socket = io('ws://localhost:8080', {
  //   reconnectionDelayMax: 10000,
  //   auth: { userId: userId }
  // });
  //this.getUserRooms(userId);
  // this.clientSocket = new ChatClientsocketkAdapter(socket, this.presentator);
  //return this.connectClient(this.clientSocket);
  // getUserById(userId: number): Promise<UserOutputData | null> {
  //   const url = `${'api/chat-user'}/${userId}`;
  //   return lastValueFrom(this.http.get<UserOutputData | null>(url).pipe(
  //     tap(res => {
  //       console.log('getUserById cont front', res);
  //       if (res) {
  //         this.getUserRooms(userId);
  //         this.connectClient(res);
  //       }
  //     })
  //   ));
  // }

  // private getConnectedUser(): Promise<UserOutputData | null> {
  //   // eslint-disable-next-line @typescript-eslint/no-this-alias
  //   const self = this;
  //   return new Promise(function (resolve) {
  //     self.clientSocket.on("connect", () => {
  //       console.log('is connected', self.clientSocket.id);
  //       console.log('is connected data', self.clientSocket.auth);
  //       resolve({ id: +self.clientSocket.id, name: 'in progress ' })
  //     });
  //   });
  // }
  // private listenReceiveMessage() {
  //   this.clientSocket.on('msgToClient', (message) => {
  //     this.presentator.receiveNewMessage(message);
  //   });
  // }

  // private listenerConnectUser() {
  //   this.clientSocket.on("connect", () => {
  //     console.log('is connected', this.clientSocket.id);
  //     console.log('is connected data', this.clientSocket.auth);
  //   });
  // }


}
