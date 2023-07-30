import { MessageOutputData, RoomOutputData, UserOutputData } from '../dtos/output.chat.data';
import { IChatControllerInputBoundary } from '../interfaces/inputs/chat.controller.input.boundary';
import { IChatPresenterOutputBoundary } from '../interfaces/outputs/chat.presenter.output.boundary';
import { IDataAccess } from '../interfaces/storage/db-gateway';
import { GetRoomsByUserInputData, GetRoomMessagesInputData, SendMessageInputData } from '../dtos/input.chat.data';
import { MessageDto } from '../dtos/models/message.dto';
import { BotParticipant, Chatroom, IParticpant, Message, Participant } from '@chat-clean-architecture/chat/entreprise-business-rules/entities';
import { IChatServerPort } from '../interfaces/network/chat-server.port';
import { ChatClientPortImpl } from './network/chat-client.port.impl';
import { NotifiyerNetworkImpl } from './network/notifiyer.network';
import { INotifilyer } from '@chat-clean-architecture/chat/entreprise-business-rules/notifiyer';
import { IChatClient } from '../interfaces/network/chat-client.port';
//Use cases (can be splitted)
export class ChatInteractorImpl implements IChatControllerInputBoundary {

  private notifiyer: INotifilyer; //TODO add it to DI

  constructor(private chatdataBase: IDataAccess,
    private presenter: IChatPresenterOutputBoundary,
    private chatServer: IChatServerPort
  ) {
    this.notifiyer = new NotifiyerNetworkImpl(this.chatServer);
    this.initChatServer();
  }

  getUser(userId: number): Promise<UserOutputData | null> {
    const existUser = this.chatdataBase.getUserById(userId);
    return new Promise((resolve) => {
      if (existUser) resolve(this.presenter.selectedUser(existUser));
    });
  }

  disconnectClient(userId: number): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(this.chatServer.disconnectUser(userId));
    });
  }

  connectClient(client: IChatClient): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(this.chatServer.connectUser(client));
    });
  }

  connectUser(userId: number): Promise<boolean> {
    const existUser = this.chatdataBase.getUserById(userId);
    if (existUser) {
      //TODO : no new here must be injected + create an abstract class
      const client: IChatClient = new ChatClientPortImpl(existUser.id,
         existUser.name,  this.presenter );
      return this.connectClient(client);
    }
    return new Promise((resolve) => { resolve(false) });
  }

  getRoomsByUser(user: GetRoomsByUserInputData): Promise<RoomOutputData[]> {
    const rooms = this.chatdataBase.getChatRoomsByUser(user.userId).map((r) => {
      return {
        roomId: r.id,
        roomName: r.name
      } as RoomOutputData;
    });
    return new Promise((resolve) => {
      resolve(this.presenter.selectedRoomsByUser(rooms));
    });
  }

  getChatRoomsMessages(room: GetRoomMessagesInputData): Promise<MessageOutputData[]> {
    const messagesByRoom = this.chatdataBase.getMessagesByRoom(room.roomId);
    const roomDto = this.chatdataBase.getChatRoomsById(room.roomId);
    const messages = messagesByRoom.map((m) => {
      return {
        authorName: m.from.user.name,
        message: m.message,
        chatRoomId: m.room.id,
      } as MessageOutputData;
    });
    const croom: RoomOutputData = {
      roomId: room.roomId, roomName: room.roomName,
      participantsNames: Object.values(roomDto.participants).map(p => p.user.name)
    };
    return new Promise((resolve) => {
      resolve(this.presenter.selectChatRoomsMessages(messages, croom));
    });
  }

  sendMessage(message: SendMessageInputData) {
    // db 
    const participantInRoom = this.chatdataBase.getParticpantByUserAndRoom(message.roomId, message.userId);
    const croom = this.chatdataBase.getChatRoomsById(message.roomId);
    const messagedto: MessageDto = {
      from: participantInRoom,
      message: message.message,
      room: croom
    };
    const newMessage = this.chatdataBase.addMessage(messagedto);
    const messagedOutput: MessageOutputData = {
      authorName: newMessage.from.user.name,
      message: newMessage.message,
      chatRoomId: newMessage.room.id,
    };
    // chat server network (using notifiyer -> entities)
    this.chatServer.broadcast(messagedOutput);
    // presenter
    return this.presenter.receiveNewMessage(messagedOutput);
  }

  private initChatServer(): void {
    const chatRooms = this.chatdataBase.getChatRooms().map(roomDto => {
      const roomEntity: Chatroom = new Chatroom(roomDto.name, roomDto.id);
      const parts: Participant[] = Object.values(roomDto.participants).map(partDto => {
        //TODO : add a participant factory
        return partDto.isBot ? new BotParticipant(partDto.user.name, partDto.user.id, this.notifiyer)
          : new Participant(partDto.user.name, partDto.user.id, this.notifiyer);
      });
      //set participants
      roomEntity.setParticipants(parts);
      //set messages
      const roomMessages: Message[] = roomDto.messages
        ? roomDto.messages.map(rm => {
          const userName = rm.from.user.name;
          const partM: IParticpant = roomEntity.getParticipants()[userName];
          return new Message(rm.message, roomEntity, partM);
        }) : [];
      roomEntity.setMessages(roomMessages);
      //add to rooms
      return roomEntity;
    });
    this.chatServer.initServer(chatRooms);
  }

}
