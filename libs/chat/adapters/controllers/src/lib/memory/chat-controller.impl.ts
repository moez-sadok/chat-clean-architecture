
import { IChatAppFacadeControllerInput, GetRoomsByUserInputData, GetRoomMessagesInputData, SendMessageInputData, RoomOutputData, MessageOutputData, UserOutputData, IChatAppFacadePresenterOutput } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { IChatController } from '../chat.controllor';
import { ChatClientPortImpl } from '@chat-clean-architecture/chat/adapters/network';
// Adapter pattern (Object) 
export class ChatControllerMemoryImpl implements IChatController {

  constructor(protected interactorInputboundry: IChatAppFacadeControllerInput,
    protected presenter: IChatAppFacadePresenterOutput) { }

  getUserById(userId: number): Promise<UserOutputData | null> {
    return this.interactorInputboundry.getUser(userId);
  }

  disconnectClient(userId: number): Promise<boolean> {
    return this.interactorInputboundry.disconnectClient(userId);
  }

  connectClient(userId: number): Promise<boolean> {
    if (typeof userId !== 'number') return new Promise((resolve) => resolve(false));
    const clientSocket = new ChatClientPortImpl(userId,'',this.presenter);
    return this.interactorInputboundry.connectClient(clientSocket);
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
