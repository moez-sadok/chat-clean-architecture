import { IChatAppFacadePresenterOutput } from '../../presenter';
import { UserOutputData, MessageOutputData, GetMessagesOutputData } from '../../dtos/output.chat.data';
import { IChatHttpController } from '../chat.controllor';
// Adapter pattern (Object) 

export class ChatControllerHttpClientAdapterImpl implements IChatHttpController {

  constructor(
    private presentator: IChatAppFacadePresenterOutput, 
    private serverUrl = '') { }

  getUserById(userId: number): Promise<UserOutputData | null> {
    const url = `${this.serverUrl}${'api/chat-user'}/${userId}`;
    return fetch(url)
      .then(res => res.json())
      .then((res: UserOutputData | null) => {
        if (res) this.presentator.selectedUser(res);
        return null;
      });
  }

  // getUserRooms(userId: number): Promise<GetRoomsByUserResponseData[]> {
  //   const url = `${this.serverUrl}${'api/chat-user-rooms'}/${userId}`;
  //   return fetch(url)
  //     .then(res => res.json())
  //     .then((res: GetRoomsByUserResponseData[]) => 
  //        this.presentator.selectedRoomsByUser(res)
  //   );
  // }

  getRoomMessages(roomId: number, userId: number): Promise<GetMessagesOutputData> {
    const qRoom = { userId: userId, roomId: roomId }; //as GetRoomMessagesInputData
    const queryString = this.objToQueryString(qRoom);
    const url = `${this.serverUrl}api/chat-room-messages?${queryString}`;
    return fetch(url)
      .then(res => res.json())
      .then((res: GetMessagesOutputData) => {
         const room = { userId: userId, roomId: roomId, roomName: res.roomName };
        return  this.presentator.selectChatRoomsMessages(res.messages, room)
      }
       
    );
  }

  sendMessage(roomId: number, userId: number, message: string) {
    const msg = { roomId: roomId, userId: userId, message: message };
    const url = `${this.serverUrl}api/send-message`;
    return fetch(url, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(msg)
    }).then(res => res.json())
      .then((res: MessageOutputData) => 
       this.presentator.receiveNewMessage(res)
    );
  }

  private objToQueryString(obj: any) {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
  }

}
