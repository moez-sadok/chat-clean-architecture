
import { IChatControllerInputBoundary, GetRoomsByUserInputData, GetRoomMessagesInputData, SendMessageInputData, RoomOutputData, MessageOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { IChatApiController } from './interfaces/chat.controllor.api';

export class ChatApiControllerImpl implements IChatApiController {

  constructor(public interactorInputboundry: IChatControllerInputBoundary) {
  }

  initUserConnection(userId: number):Promise<boolean> {
   return this.interactorInputboundry.connectUser(userId);
  }

  getUserRooms(userId: number) : Promise<RoomOutputData[]> {
    const userInput: GetRoomsByUserInputData = { userId: userId };
    return this.interactorInputboundry.getRoomsByUser(userInput);
  }

  getRoomMessages(roomId: number,roomName: string,userId: number) : Promise<MessageOutputData[]> {
    const roomInput: GetRoomMessagesInputData = { roomId: roomId , userId : userId, roomName:roomName };
    return this.interactorInputboundry.getChatRoomsMessages(roomInput);
  }

  sendMessage(roomId: number, userId: number, message: string) {
    const messageInput: SendMessageInputData = {roomId: roomId,userId: userId,message: message};
    return this.interactorInputboundry.sendMessage(messageInput);
  }
}
