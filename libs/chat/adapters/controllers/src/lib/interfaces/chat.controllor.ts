import {
  IChatControllerInputBoundary
} from '@chat-clean-architecture/chat/application-business-rules/interactor';

export interface IChatController {
  interactorInputboundry: IChatControllerInputBoundary;
  initUserConnection(userId: number):void;
  getUserRooms(userId: number): void;
  getRoomMessages(roomId: number,roomName: string,userId: number): void;
  sendMessage(roomId: number, userId: number, message: string): void;
}
