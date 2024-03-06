
import { IChatAppFacadeControllerInput, GetRoomsByUserInputData, GetRoomMessagesInputData, SendMessageInputData, RoomOutputData, MessageOutputData, UserOutputData, IChatClient } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { IChatController } from './interfaces/chat.controllor';

export class ChatControllerImpl implements IChatController {

  constructor(protected interactorInputboundry: IChatAppFacadeControllerInput) { }

  getUserById(userId: number): Promise<UserOutputData | null> {
    return this.interactorInputboundry.getUser(userId);
  }

  disconnectClient(userId: number): Promise<boolean> {
    return this.interactorInputboundry.disconnectClient(userId);
  }

  connectClient(client: IChatClient | number): Promise<boolean> {
    //TO-CHECK
    if (typeof client === 'number') return new Promise((resolve) => {
      resolve(false);
    });
    return this.interactorInputboundry.connectClient(client);
  }

  getUserRooms(userId: number): Promise<RoomOutputData[]> {
    const userInput: GetRoomsByUserInputData = { userId: userId };
    return this.interactorInputboundry.getRoomsByUser(userInput);
  }

  getRoomMessages(roomId: number, roomName: string): Promise<MessageOutputData[]> {
    const roomInput: GetRoomMessagesInputData = { roomId: roomId, roomName: roomName };
    return this.interactorInputboundry.getChatRoomsMessages(roomInput);
  }

  sendMessage(roomId: number, userId: number, message: string) {
    const messageInput: SendMessageInputData = { roomId: roomId, userId: userId, message: message };
    return this.interactorInputboundry.sendMessage(messageInput);
  }
}
