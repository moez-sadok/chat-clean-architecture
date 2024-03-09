


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
import { IChatServerPort } from '../components/network/abstraction/chat-server.port';

export class ChatAppFacadeImpl implements IChatAppFacadeControllerInput {

  constructor(
    private chatRepository: IChatRepository,
    private presenter: IChatAppFacadePresenterOutput,
    private chatServer: IChatServerPort
  ) { }

  getUser(userId: number): Promise<UserOutputData | null> {
   return new GetUserByIdFeature(this.chatRepository,this.presenter).getUser(userId);
  }

  disconnectClient(userId: number): Promise<boolean> {
    return new DisconnectClientFeature(this.chatServer).disconnectClient(userId);
  }

  connectClient(client: any): Promise<boolean> {
    return new ConnectClientFeature(this.chatServer).connectClient(client)
  }

  getRoomsByUser(user: GetRoomsByUserInputData): Promise<RoomOutputData[]> {
    return new GetRoomsByUserFeature(this.chatRepository,this.presenter).getRoomsByUser(user);
  }

  getChatRoomsMessages(room: GetRoomMessagesInputData): Promise<MessageOutputData[]> {
    return new GetMessagesByRoomFeature(this.chatRepository,this.presenter).getChatRoomsMessages(room)
  }

  sendMessage(message: SendMessageInputData) {
    return new SendMessageFeature(this.chatRepository,this.presenter,this.chatServer).sendMessage(message);
  }

}
