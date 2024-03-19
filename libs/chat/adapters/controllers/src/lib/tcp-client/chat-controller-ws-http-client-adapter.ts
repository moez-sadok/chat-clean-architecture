
import { ChatClientSocketkAdapter } from '@chat-clean-architecture/chat/adapters/network';
import {IChatAppFacadePresenterOutput, RoomOutputData,
  MessageOutputData, UserOutputData
} from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { Socket, io } from 'socket.io-client';
import { IChatController } from '../chat.controllor';
import { IChatClient } from '@chat-clean-architecture/chat/entreprise-business-rules/notifiyer';
// Adapter pattern (Object) 
export class ChatControllerWsHttpClientAdapterImpl implements IChatController {

  constructor(private presentator: IChatAppFacadePresenterOutput, private serverUrl ='') { }

  connectClient(userId: number): Promise<boolean> {
    const socket: Socket = io('ws://localhost:8080', {
      reconnectionDelayMax: 10000,
      auth: { userId: userId },
    });
    socket.id = userId.toString();
   const clientSocket: IChatClient = new ChatClientSocketkAdapter(socket, this.presentator);
    return new Promise((resolve) => {
      if (clientSocket) resolve(true); 
      resolve(false);
    });
  }

  getUserById(userId: number): Promise<UserOutputData | null> {
    const url = `${this.serverUrl}${'api/chat-user'}/${userId}`;
    return fetch(url)
      .then(res => res.json())
      .then((res: UserOutputData | null) => {
        if (res) this.presentator.selectedUser(res);
        return null;
      });
  }

  getUserRooms(userId: number): Promise<RoomOutputData[]> {
    const url = `${this.serverUrl}${'api/chat-user-rooms'}/${userId}`;
    return fetch(url)
      .then(res => res.json())
      .then((res: RoomOutputData[]) => this.presentator.selectedRoomsByUser(res));
  }

  getRoomMessages(roomId: number, roomName: string, userId: number): Promise<MessageOutputData[]> {
    const room = { userId: userId, roomId: roomId, roomName: roomName }; //as GetRoomMessagesInputData
    const queryString = this.objToQueryString(room);
    const url = `${this.serverUrl}api/chat-room-messages?${queryString}`;
    return fetch(url)
      .then(res => res.json())
      .then((res: MessageOutputData[]) => this.presentator.selectChatRoomsMessages(res, room));
  }

  sendMessage(roomId: number, userId: number, message: string) {
 //TODO: change by post request or with ws: this.clientSocket.emit('msgToServer', messageData, (val: any) => {});  //for adding e2ee encrypt message in the client side controller
    const msg = { roomId: roomId, userId: userId, message: message };
    const queryString = this.objToQueryString(msg);
    const url = `${this.serverUrl}api/send-message?${queryString}`;
    return fetch(url)
    .then(res => res.json())
    .then((res: MessageOutputData) => this.presentator.receiveNewMessage(res));
  }

  disconnectClient(userId: number): Promise<boolean> {
    return new Promise((resolve) => { resolve(true); });
  }

  private objToQueryString(obj: any) {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
  }

}
