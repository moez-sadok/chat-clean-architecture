import { MessageOutputData, RoomOutputData } from '../dtos/output.chat.data';
import { IChatControllerInputBoundary } from '../interfaces/inputs/chat.controller.input.boundary';
import { IChatPresenterOutputBoundary } from '../interfaces/outputs/chat.presenter.output.boundary';
import { IDataAccess } from '../interfaces/storage/db-gateway';
import { GetRoomsByUserInputData, GetRoomMessagesInputData, SendMessageInputData } from '../dtos/input.chat.data';
import { MessageDto } from '../dtos/models/message.dto';
import { BotParticipant, Chatroom, IParticpant, Message, Participant } from '@chat-clean-architecture/chat/entreprise-business-rules/entities';
import { IChatServerPort } from '../interfaces/network/chat-server.port';
import { ChatClientPortMemoryImpl } from './network/chat-client.memory.port.impl';
import { NotifiyerNetworkImpl } from './network/notifiyer.network.memory';
import { INotifilyer } from '@chat-clean-architecture/chat/entreprise-business-rules/notifiyer';
//Use cases (can be splitted)
export class ChatInteractorImpl implements IChatControllerInputBoundary {

  private notifiyer: INotifilyer;

  constructor( private chatdataBase: IDataAccess,
    private presenter: IChatPresenterOutputBoundary,
    private chatServer: IChatServerPort
  ) {
    this.notifiyer = new NotifiyerNetworkImpl(this.chatServer);
    this.initChatServer();
  }

  connectUser(userId: number): Promise<boolean> {
    const existUser = this.chatdataBase.getUserById(userId);
    return new Promise((resolve) => {
      if (existUser.id)
        resolve(this.chatServer.connectUser(new ChatClientPortMemoryImpl(existUser.id, this.presenter)));
    });
  }

  getRoomsByUser(user: GetRoomsByUserInputData): Promise<RoomOutputData[]> {
    const rooms = this.chatdataBase.getChatRoomsByUser(user.userId).map((r) => {
      return {
        roomId: r.id,
        roomName: r.name,
        rommParticipantsNames: Object.values(r.participants).map(p => p.user.name)
      } as RoomOutputData;
    });
    return new Promise((resolve) => {
      resolve(this.presenter.selectedRoomsByUser(rooms));
    });
  }

  getChatRoomsMessages(room: GetRoomMessagesInputData): Promise<MessageOutputData[]> {
    const messagesByRoom = this.chatdataBase.getMessagesByRoom(room.roomId);
    const messages = messagesByRoom.map((m) => {
      return {
        participantName: m.from.user.name,
        message: m.message,
        chatRoomId: m.room.id,
      } as MessageOutputData;
    });
    const croom: RoomOutputData = { roomId: room.roomId, roomName: room.roomName };
    return new Promise((resolve) => {
      const res = this.presenter.selectChatRoomsMessages(messages, croom);
      resolve(res);
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
      participantName: newMessage.from.user.name,
      message: newMessage.message,
      chatRoomId: newMessage.room.id,
    };
    //entity
    const chatRoomEntity = new Chatroom(croom.name, croom.id);
    const participantEntity = new Participant(newMessage.from.user.name, newMessage.from.user.id);
    const messageEntity = new Message(message.message, chatRoomEntity, participantEntity);
    this.chatServer.broadcast(messageEntity);
    //presenter
    const msg = this.presenter.receiveNewMessage(messagedOutput);
    return messagedOutput;
  }

  private initChatServer(): void {
    const chatRooms = this.chatdataBase.getChatRooms().map(roomDto => {
      const roomEntity: Chatroom = new Chatroom(roomDto.name, roomDto.id);
      const parts: Participant[] = Object.values(roomDto.participants).map(partDto => {
        return partDto.isBot ? new BotParticipant(partDto.user.name, partDto.user.id, this.notifiyer)
          : new Participant(partDto.user.name, partDto.user.id, this.notifiyer);
      });
      //set participants
      roomEntity.initChatRoom(parts, []);
      //set messages
      const roomMessages: Message[] = roomDto.messages
        ? roomDto.messages.map(rm => {
          const roomParts = roomEntity.getParticipants();
          const userName = rm.from.user.name;
          const partM: IParticpant = roomParts[userName];
          return new Message(rm.message, roomEntity, partM);
        }) : [];
      roomEntity.initChatRoom([], roomMessages);
      //add to rooms
      return roomEntity;
    });
    this.chatServer.initServer(chatRooms);
  }

}
