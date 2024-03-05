
import { IChatAppFacadeControllerInput, GetRoomsByUserInputData, GetRoomMessagesInputData, SendMessageInputData, IChatClient, ChatClientPortImpl, MessageOutputData, RoomOutputData, UserOutputData, IChatAppFacadePresenterOutput } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { IChatController } from './interfaces/chat.controllor';

export class ChatControllerMemoryImpl implements IChatController {

  constructor(public interactorInputboundry: IChatAppFacadeControllerInput,
    private presentator: IChatAppFacadePresenterOutput) { }

  async connectClient(userId: number): Promise<boolean> {
    //TO-CHECK
    const existUser = await this.interactorInputboundry.getUser(userId);
    if (!existUser) throw new Error('Not registerd user, disabled connection... ');
    const client: IChatClient = new ChatClientPortImpl(existUser.id, existUser.name, this.presentator);
    return this.interactorInputboundry.connectClient(client);
  }

  getUserRooms(userId: number): Promise<RoomOutputData[]> {
    const userInput: GetRoomsByUserInputData = { userId: userId };
    return this.interactorInputboundry.getRoomsByUser(userInput);
  }

  getRoomMessages(roomId: number, roomName: string, userId: number): Promise<MessageOutputData[]> {
    const roomInput: GetRoomMessagesInputData = { roomId: roomId, roomName: roomName };
    return this.interactorInputboundry.getChatRoomsMessages(roomInput);
  }

  sendMessage(roomId: number, userId: number, message: string): void {
    const messageInput: SendMessageInputData = { roomId: roomId, userId: userId, message: message };
    this.interactorInputboundry.sendMessage(messageInput);
  }

  disconnectClient(userId: number): Promise<boolean> {
    return this.interactorInputboundry.disconnectClient(userId);
  }

  getUserById(userId: number): Promise<UserOutputData | null> {
    return this.interactorInputboundry.getUser(userId);
  }


}
