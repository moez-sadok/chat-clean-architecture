import { MessageDto } from '@chat-clean-architecture/chat/entreprise-business-rules/dtos';
import { MessageOutputData, RoomOutputData } from './dtos/output.chat.data';
import { IChatControllerInputBoundary } from './interfaces/inputs/chat.controller.input.boundary';
import { IChatPresenterOutputBoundary } from './interfaces/outputs/chat.presenter.output.boundary';
import { IDataAccess } from './interfaces/storage/db-gateway';
import { IChatServer } from './interfaces/server/chat-server';
import { GetRoomsByUserInputData, GetRoomMessagesInputData, SendMessageInputData, LeaveRoomInputData, CreateChatRoomInputData } from './dtos/input.chat.data';

export class ChatInteractorImpl implements IChatControllerInputBoundary {

  constructor(
    private chatdataBase: IDataAccess,
    private presenter: IChatPresenterOutputBoundary,
    private chatServer: IChatServer
  ) {
    console.log('ChatInteractorImpl constructor');
  }

  connectUser(userId: number): void {
    const existUser = this.chatdataBase.getUserById(userId);
    this.chatServer.connectUserPresenter(existUser, this.presenter);
  }

  getRoomsByUser(user: GetRoomsByUserInputData): void {
    const rooms = this.chatdataBase.getChatRoomsByUser(user.userId).map((r) => {
      return {
        roomId: r.id,
        roomName: r.name,
        rommParticipantsNames: Object.values(r.participants).map(p => p.user.name)
      } as RoomOutputData;
    });
    // this.chaPresenterOutputBoundary.selectedRoomsByUser(rooms);
    this.chatServer.getConnectetdUsers()[user.userId].getPresenter().selectedRoomsByUser(rooms);
  }

  getChatRoomsMessages(room: GetRoomMessagesInputData): void {
    const messagesByRoom = this.chatdataBase.getMessagesByRoom(room.roomId);
    const messages = messagesByRoom.map((m) => {
      return {
        participantName: m.from.user.name,
        message: m.message,
        chatRoomId: m.room.id,
      } as MessageOutputData;
    });
    //this.chaPresenterOutputBoundary.selectChatRoomsMessages(messages);
    const croom: RoomOutputData = { roomId: room.roomId, roomName: room.roomName };
    this.chatServer.getConnectetdUsers()[room.userId].getPresenter().selectChatRoomsMessages(messages, croom)
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
    // const messagedOutput: MessageOutputData = {
    //   participantName: newMessage.from.user.name,
    //   message: newMessage.message,
    //   chatRoomId: newMessage.room.id,
    // };
    //return this.chaPresenterOutputBoundary.receiveNewMessage(messagedOutput);
    return this.chatServer.broadcast(message);
  }

  leaveChatRoom(data: LeaveRoomInputData): void {
    throw new Error('Method not implemented.');
  }

  createChatRoom(data: CreateChatRoomInputData): void {
    throw new Error('Method not implemented.');
  }
}
