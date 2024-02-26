
import { IChatAppFacadeControllerInput, GetRoomsByUserInputData, GetRoomMessagesInputData, SendMessageInputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { IChatController } from './interfaces/chat.controllor';

export class ChatControllerMemoryImpl implements IChatController {

  constructor(public interactorInputboundry: IChatAppFacadeControllerInput) {}

  initUserConnection(userId: number) {
    this.interactorInputboundry.getUser(userId);
    this.interactorInputboundry.connectUser(userId);
    this.getUserRooms(userId)
  }

  getUserRooms(userId: number) {
    const userInput: GetRoomsByUserInputData = { userId: userId };
    this.interactorInputboundry.getRoomsByUser(userInput);
  }

  getRoomMessages(roomId: number,roomName: string) {
    const roomInput: GetRoomMessagesInputData = { roomId: roomId ,  roomName:roomName };
    this.interactorInputboundry.getChatRoomsMessages(roomInput);
  }

  sendMessage(roomId: number, userId: number, message: string) {
    const messageInput: SendMessageInputData = {roomId: roomId,userId: userId,message: message};
    this.interactorInputboundry.sendMessage(messageInput);
  }
}
