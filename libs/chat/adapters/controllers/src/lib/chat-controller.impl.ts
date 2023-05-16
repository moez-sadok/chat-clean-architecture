
import { IChatControllerInputBoundary, GetRoomsByUserInputData, GetRoomMessagesInputData, SendMessageInputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { IChatController } from './interfaces/chat.controllor';

export class ChatControllerImpl implements IChatController {

  initUserConnection(userId: number) {
   this.interactorInputboundry.connectUser(userId);
  }
  constructor(public interactorInputboundry: IChatControllerInputBoundary) {}

  getUserRooms(userId: number) {
    const userInput: GetRoomsByUserInputData = { userId: userId };
    this.interactorInputboundry.getRoomsByUser(userInput);
  }

  getRoomMessages(roomId: number,roomName: string,userId: number) {
    const roomInput: GetRoomMessagesInputData = { roomId: roomId , userId : userId, roomName:roomName };
    this.interactorInputboundry.getChatRoomsMessages(roomInput);
  }

  sendMessage(roomId: number, userId: number, message: string) {
    const messageInput: SendMessageInputData = {roomId: roomId,userId: userId,message: message};
    return this.interactorInputboundry.sendMessage(messageInput);
  }
}
