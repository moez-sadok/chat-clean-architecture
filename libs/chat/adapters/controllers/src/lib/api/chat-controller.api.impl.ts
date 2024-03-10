
import { IChatAppFacadeControllerInput, GetRoomsByUserInputData, GetRoomMessagesInputData, SendMessageInputData, RoomOutputData, MessageOutputData, UserOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { IChatController } from '../chat.controllor';
import { IChatClient } from '@chat-clean-architecture/chat/entreprise-business-rules/notifiyer';
import { ChatClientServerAdapter } from '@chat-clean-architecture/chat/adapters/network';
import { Socket } from 'socket.io';
// Adapter pattern (Object) 
export class ChatControllerApiImpl implements IChatController {

  constructor(protected interactorInputboundry: IChatAppFacadeControllerInput) { }

  getUserById(userId: number): Promise<UserOutputData | null> {
    return this.interactorInputboundry.getUser(userId);
  }

  disconnectClient(userId: number): Promise<boolean> {
    return this.interactorInputboundry.disconnectClient(userId);
  }

  connectClient(client: Socket): Promise<boolean> {
    if (typeof client === 'number') return new Promise((resolve) => resolve(false));
    const chatClient: IChatClient = new ChatClientServerAdapter(client);
    return this.interactorInputboundry.connectClient(chatClient);
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
