import { MessageOutputData, RoomOutputData, SendMessageInputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';

//make new api presenter
// Not used yet just for local test
export interface IChatAppApiMainFacade {
  //app behavior
  getUserChatRooms(userId: number): Promise<RoomOutputData[]>;
  getRoomMessages(roomId: number, roomName: string, userId: number): Promise<MessageOutputData[]>;
  sendMessage(message: SendMessageInputData):void ; //: Promise<MessageOutputData>
  //message:MessageOutputData
  receiveMessage(): Promise<MessageOutputData | null>;
  // driver/web server behavior
  initUserConnection(connectedUserId: number): void;
  leaveRoom(roomId: number): void;
  joinRoom(roomId: number): void;
}
