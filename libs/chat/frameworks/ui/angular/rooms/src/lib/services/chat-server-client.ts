import {
  ChatDataViewModelDto,
  MessageDataViewModelDto,
} from '@chat-clean-architecture/chat/adapters/presenters';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  firstValueFrom,
  lastValueFrom,
  throwError,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

//import { IChatAppMainMemoryFacade } from '@chat-clean-architecture/chat/application-business-rules/main';
import { SendMessageInputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';

@Injectable()
export class ChatClientServerImpl /*implements IChatAppMainMemoryFacade */{
  private clientSocket!: Socket;
  //private lastReceiveMessage$: BehaviorSubject<MessageDataViewModelDto | null> = new BehaviorSubject<MessageDataViewModelDto | null>(null);
  private lastReceiveMessage$: Promise<MessageDataViewModelDto | null>;

  constructor(private http: HttpClient) {
    this.lastReceiveMessage$ = new Promise((resolve) => {
      resolve(null);
    });
  }

  getUserChatView(userId: number): Promise<ChatDataViewModelDto> {
    const url = `${'api/chat-user-page-view'}/${userId}`;
    return lastValueFrom(
      this.http
        .get<ChatDataViewModelDto>(url)
        .pipe(catchError((error) => this.handleError(error)))
    );
  }

  getRoomMessages(roomId: number): Promise<MessageDataViewModelDto[]> {
    const url = `${'api/chat-room-messages'}/${roomId}`;
    return lastValueFrom(
      this.http
        .get<MessageDataViewModelDto[]>(url)
        .pipe(catchError((error) => this.handleError(error)))
    );
  }

  sendMessage(message: SendMessageInputData): Promise<MessageDataViewModelDto> {
    const msg = this.clientSocket.emit('msgToServer', message, (val: any) => {
      console.log(val);
    });
    return new Promise((resolve) => {
      //@ts-ignore
      resolve(msg);
    });
  }

  receiveMessage(): Promise<MessageDataViewModelDto | null> {
    return this.lastReceiveMessage$;
    // console.log('this.lastReceiveMessage$.value',this.lastReceiveMessage$.value)
    // return lastValueFrom(this.lastReceiveMessage$.asObservable());
    // return new Promise((resolve) => {
    //   resolve(this.lastReceiveMessage$.value);
    // });
    // this.clientSocket.on('msgToClient', (message) => {
    //   console.log('receved message',message);
    //   //this.lastReceiveMessage$.next(message);
    //  // this.receiveMessage(message);
    //   return new Promise((resolve) => {
    //     resolve(message);
    //   });
    // });
  }

  initUserConnection(userId: number) {
    this.clientSocket = io('ws://localhost:8080', {
      reconnectionDelayMax: 10000,
      auth: { userId: userId },
    });
    this.clientSocket.on('msgToClient', (message :any) => {
      console.log('receved message', message);
      this.lastReceiveMessage$ = Promise.resolve(message);
      this.receiveMessage();
    });
  }

  joinRoom(roomId: number) {
    this.clientSocket.emit('joinRoom', roomId);
  }

  leaveRoom(roomId: number) {
    this.clientSocket.emit('leaveRoom', roomId);
  }

  //error handler
  private handleError(error: HttpErrorResponse) {
    //log and retry mecanisim todo
    if (error.error instanceof ErrorEvent)
      console.error('An error occurred:', error.error.message);
    else
      console.error(
        `Chat Api returned code ${error.status}, ` + `body was: ${error.error}`
      );
    const err = new Error('Something bad happened; please try again later.');
    return throwError(() => err);
  }

  //sockets

  //api
  // getChatPageView(userId: number): Observable<ChatDataViewModelDto> {
  //   const url = `${'api/chat-user-page-view'}/${userId}`;
  //   return this.http.get<ChatDataViewModelDto>(url).pipe(
  //     catchError((error) => this.handleError(error))
  //   );
  // }

  // getSelectedRoomMessages(roomId: number): Observable<MessageDataViewModelDto[]> {
  //   const url = `${'api/chat-room-messages'}/${roomId}`;
  //   return this.http.get<MessageDataViewModelDto[]>(url).pipe(
  //     catchError((error) => this.handleError(error))
  //   );
  // }

  // sendMessage(messageS:any) {
  //   //const messageS = {message: message,roomId: roomId,userId: userId}; //as SendMessageInputData
  //   this.clientSocket.emit('msgToServer', messageS);
  // }

  // receiveMessage(): Observable<MessageDataViewModelDto | null> {
  //   return this.lastReceiveMessage$.asObservable();
  // }
}
// import { SendMessageInputData } from "@prodsoft/chat/interactor";
//import { ChatServerFacade } from "./interfaces/chat.server.facade";

// initclientsocket() {
//   this.clientSocket.on('msgToClient', (message) => {
//     this.lastReceiveMessage$.next(message);
//   });
//   // this.clientSocket.on('connect', () => {
//   //   console.log('on client connect ')
//   //   //this.check();
//   // });
//   // this.clientSocket.on('joinedRoom', (room) => {
//   //   console.log('on client joinedRoom ',room)
//   //   // this.rooms[room] = true;
//   // });
//   // this.clientSocket.on('leftRoom', (room) => {
//   //   console.log('on client leftRoom ',room)
//   //   //this.rooms[room] = false;
//   // });
// }
