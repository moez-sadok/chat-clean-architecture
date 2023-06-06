
import { IChatControllerInputBoundary, GetRoomsByUserInputData, GetRoomMessagesInputData, SendMessageInputData, RoomOutputData, MessageOutputData, UserOutputData, IChatClient } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { IChatApiController } from './interfaces/chat.controllor.api';

export class ChatApiControllerImpl implements IChatApiController {

  constructor(public interactorInputboundry: IChatControllerInputBoundary) {
  }

  disconnectClient(userId: number): Promise<boolean> {
     return this.interactorInputboundry.disconnectClient(userId);
  }

  connectClient(client: IChatClient): Promise<UserOutputData | null> {
       return this.interactorInputboundry.connectClient(client);
  }

  initUserConnection(userId: number):Promise<UserOutputData | null> {
   return this.interactorInputboundry.connectUser(userId);
  }

  getUserRooms(userId: number) : Promise<RoomOutputData[]> {
    const userInput: GetRoomsByUserInputData = { userId: userId };
    return this.interactorInputboundry.getRoomsByUser(userInput);
  }

  getRoomMessages(roomId: number,roomName: string) : Promise<MessageOutputData[]> {
    const roomInput: GetRoomMessagesInputData = { roomId: roomId , roomName:roomName };
    return this.interactorInputboundry.getChatRoomsMessages(roomInput);
  }

  sendMessage(roomId: number, userId: number, message: string) {
    const messageInput: SendMessageInputData = {roomId: roomId,userId: userId,message: message};
    return this.interactorInputboundry.sendMessage(messageInput);
  }
}
