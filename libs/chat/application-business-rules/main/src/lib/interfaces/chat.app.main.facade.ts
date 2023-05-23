import { SendMessageInputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import {
  ChatDataViewModelDto,
  MessageDataViewModelDto,
} from '@chat-clean-architecture/chat/adapters/presenters';
// Not used yet just for local test
export interface IChatAppMainMemoryFacade {
  //app behavior
  getUserChatRooms(userId: number): Promise<ChatDataViewModelDto>;
  getRoomMessages(roomId: number, roomName: string, userId: number): Promise<MessageDataViewModelDto[]>;
  sendMessage(message: SendMessageInputData): Promise<MessageDataViewModelDto>;
  //message:MessageDataViewModelDto
  receiveMessage(): Promise<MessageDataViewModelDto | null>;
  // driver/web server behavior
  initUserConnection(connectedUserId: number): void;
  leaveRoom(currentroomId: number): void;
  joinRoom(roomId: number): void;
}
