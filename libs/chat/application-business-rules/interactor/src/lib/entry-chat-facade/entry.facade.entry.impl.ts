import { MessageOutputData, RoomOutputData, UserOutputData } from '../dtos/output.chat.data';
import { IChatRepository } from '../components/chat-repository/repository-gateway';
import { GetRoomsByUserInputData, GetRoomMessagesInputData, SendMessageInputData } from '../dtos/input.chat.data';
import { GetUserByIdFeature } from '../features/get-user-by-id/getUserById.feature';
import { DisconnectClientFeature } from '../features/disconnect-client/disconnectClient.feature';
import { IChatAppFacadeControllerInput } from './entry.facade.controller';
import { ConnectClientFeature } from '../features/connect-client/connectClient.feature';
import { GetRoomsByUserFeature } from '../features/get-rooms-by-user/getRoomsByUser.feature';
import { GetMessagesByRoomFeature } from '../features/get-messages-by-room/getMessagesByRoom.feature';
import { SendMessageFeature } from '../features/send-message/send-message.feature';
import { IChatAppFacadePresenterOutput } from './entry.facade.presenter';
import { IChatServerPort } from '../components/network/chat-server.port';

export class ChatAppFacadeImpl implements IChatAppFacadeControllerInput {

  getUserByIdFeature: GetUserByIdFeature;
  disconnectClientFeature: DisconnectClientFeature;
  connectClientFeature: ConnectClientFeature;
  getRoomsByUserFeature: GetRoomsByUserFeature;
  getMessagesByRoomFeature: GetMessagesByRoomFeature;
  sendMessageFeature: SendMessageFeature;

  constructor(
    private chatRepository: IChatRepository,
    private presenter: IChatAppFacadePresenterOutput,
    private chatServer: IChatServerPort
  ) {
    this.getUserByIdFeature = new GetUserByIdFeature(this.chatRepository, this.presenter);
    this.disconnectClientFeature = new DisconnectClientFeature(this.chatServer);
    this.connectClientFeature = new ConnectClientFeature(this.chatServer);
    this.getRoomsByUserFeature = new GetRoomsByUserFeature(this.chatRepository, this.presenter);
    this.getMessagesByRoomFeature = new GetMessagesByRoomFeature(this.chatRepository, this.presenter);
    this.sendMessageFeature = new SendMessageFeature(this.chatRepository, this.presenter, this.chatServer);
  }

  getUser(userId: number): Promise<UserOutputData | null> {
    return this.getUserByIdFeature.getUser(userId);
  }

  disconnectClient(userId: number): Promise<boolean> {
    return this.disconnectClientFeature.disconnectClient(userId);
  }

  connectClient(client: any): Promise<boolean> {
    return this.connectClientFeature.connectClient(client)
  }

  getRoomsByUser(user: GetRoomsByUserInputData): Promise<RoomOutputData[]> {
    return this.getRoomsByUserFeature.getRoomsByUser(user);
  }

  getChatRoomsMessages(room: GetRoomMessagesInputData): Promise<MessageOutputData[]> {
    return this.getMessagesByRoomFeature.getChatRoomsMessages(room)
  }

  sendMessage(message: SendMessageInputData) {
    return this.sendMessageFeature.sendMessage(message);
  }

}
