
import { IChatAppApiMainFacade } from '@chat-clean-architecture/chat/application-business-rules/main';
import { ChatAppMainConfig } from './chat-main-api-config';
import { MessageOutputData, RoomOutputData, SendMessageInputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';

// Main app role for the server
export class ChatMainApiImpl extends ChatAppMainConfig implements IChatAppApiMainFacade {

  constructor() {
    super()
  }

  getUserChatView(userId: number): Promise<RoomOutputData[]> {
    return new Promise((resolve) => {
      resolve(this.chatController.getUserRooms(userId));
    });
  }

  getRoomMessages(roomId: number, roomName: string, userId: number): Promise<MessageOutputData[]> {
    return new Promise((resolve) => {
      resolve(this.chatController.getRoomMessages(roomId, roomName, userId));
    });
  }

  sendMessage(message: SendMessageInputData): void {
    return this.chatController.sendMessage(message.roomId, message.userId, message.message);
  }

  initUserConnection(connectedUserId: number): void {
    this.chatController.initUserConnection(connectedUserId);
  }

  ///
  receiveMessage(): Promise<MessageOutputData | null> {
    throw new Error('Method not implemented.');
  }

  leaveRoom(roomId: number): void {
    throw new Error('Method not implemented.');
  }

  joinRoom(roomId: number): void {
    throw new Error('Method not implemented.');
  }

}
