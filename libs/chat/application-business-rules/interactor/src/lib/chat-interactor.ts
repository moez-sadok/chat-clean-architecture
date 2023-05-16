import { MessageDto } from '@chat-clean-architecture/chat/entreprise-business-rules/dtos';
import {
  GetRoomsByUserInputData,
  GetRoomMessagesInputData,
  CreateChatRoomInputData,
  SendMessageInputData,
  LeaveRoomInputData,
} from './dtos/input.chat.data';
import { MessageOutputData, RoomOutputData } from './dtos/output.chat.data';
import { IChatControllerInputBoundary } from './interfaces/chat.controller.input.boundary';
import { IChatPresenterOutputBoundary } from './interfaces/chat.presenter.output.boundary';
import { IDataAccess } from './interfaces/database';
import { IChatServer } from './interfaces/chat-server';
import { ConnectedUserImpl } from './client-server/connected-user.impl';
import { IConnectedUser } from './interfaces/connected-user';

export class ChatInteractorImpl implements IChatControllerInputBoundary {

  constructor(
    private chatdataBase: IDataAccess,
    private chaPresenterOutputBoundary: IChatPresenterOutputBoundary,
    private chatServer : IChatServer
  ) {
    console.log('ChatInteractorImpl constructor');
  }

  connectUser(userId: number): void {
    const existUser = this.chatdataBase.getUserById(userId);
    const cuser : IConnectedUser = new ConnectedUserImpl(existUser,this.chaPresenterOutputBoundary)
    this.chatServer.connectUser(cuser);
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
    const croom : RoomOutputData = { roomId: room.roomId, roomName: room.roomName};
    this.chatServer.getConnectetdUsers()[room.userId].getPresenter().selectChatRoomsMessages(messages,croom)
  }

  sendMessage(message: SendMessageInputData) {
    // db 
    const participantInRoom = this.chatdataBase.getParticpantByUserAndRoom(
      message.roomId,
      message.userId
    );
    const croom = this.chatdataBase.getChatRoomsById(message.roomId);
    const messagedto: MessageDto = {
      from: participantInRoom,
      message: message.message,
      room: croom,
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

// using entities in ram (all loaded in the interceptor) in ram testing
//client use example (one room):
// const yuri: UserDto = { name: 'Yuri' };
// const amelie: UserDto = { name: 'Ameli' };
// const yuriParticipantAmelie = new Participant(yuri);
// const amelieParticipantYuri = new Participant(amelie);

// const privateRoomYuriAmeli: Chatroom = new Chatroom('Yuri & Amelie');
// privateRoomYuriAmeli.register(yuriParticipantAmelie);
// privateRoomYuriAmeli.register(amelieParticipantYuri);

// yuriParticipantAmelie.send('are you good , what you have for the next week :p');
// amelieParticipantYuri.send('It is not your business');
