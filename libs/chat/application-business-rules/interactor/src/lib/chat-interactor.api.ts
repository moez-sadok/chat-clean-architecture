import { MessageOutputData, RoomOutputData } from './dtos/output.chat.data';
import { IChatControllerInputBoundary } from './interfaces/inputs/chat.controller.input.boundary';
import { IChatPresenterOutputBoundary } from './interfaces/outputs/chat.presenter.output.boundary';
import { IDataAccess } from './interfaces/storage/db-gateway';
import { GetRoomsByUserInputData, GetRoomMessagesInputData, SendMessageInputData } from './dtos/input.chat.data';
import { MessageDto } from './dtos/models/message.dto';

/* for this example the interactor contain chat use cases (to be splited by ISP) */
export class ChatInteractorApiImpl implements IChatControllerInputBoundary {

  constructor(
    private chatdataBase: IDataAccess,
    private presenter: IChatPresenterOutputBoundary
  ) {}

  connectUser(userId: number): Promise<boolean> {
    const existUser = this.chatdataBase.getUserById(+userId);
    return new Promise((resolve) => {
      resolve(existUser ? true : false);
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
     ;
    return new Promise((resolve) => {
      resolve(this.presenter.selectedRoomsByUser(rooms));
    });
  }

  getChatRoomsMessages(room: GetRoomMessagesInputData):  Promise<MessageOutputData[]>  {
    const messagesByRoom = this.chatdataBase.getMessagesByRoom(room.roomId);
    const messages = messagesByRoom.map((m) => {
      return {
        participantName: m.from.user.name,
        message: m.message,
        chatRoomId: m.room.id,
      } as MessageOutputData;
    });
    //
    const croom: RoomOutputData = { roomId: room.roomId, roomName: room.roomName };
    return new Promise((resolve) => {
      resolve(this.presenter.selectChatRoomsMessages(messages,croom));
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
    return this.presenter.receiveNewMessage(messagedOutput);
  }

}
