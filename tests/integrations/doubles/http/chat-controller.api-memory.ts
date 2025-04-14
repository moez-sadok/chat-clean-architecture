import { IGetMessagesByRoomInput, IGetRoomsByUserInput, IGetUserByIdInput, ISendMessageInput } from "../../../../core/features/chat";
import { IChatHttpController } from "../../../../core/controllers/chat.controllor";

export class ChatHttpControllerApiMemory implements IChatHttpController {

  constructor(
    private getRoomsByUserFeature: IGetRoomsByUserInput,
    private getUserByIdFeature: IGetUserByIdInput,
    private getMessagesByRoomFeature: IGetMessagesByRoomInput,
    private sendMessageFeature: ISendMessageInput
  ) { }

  getUserRooms(userId: number) {
    return this.getRoomsByUserFeature.getRoomsByUser({ userId: +userId });
  }

  getUserById(userId: number) {
    return this.getUserByIdFeature.getUser(+userId);
  }

  getRoomMessages(roomId: number, roomName: string) {
    //+query.userId
    return this.getMessagesByRoomFeature.getChatRoomsMessages({ roomId: +roomId, roomName: roomName });
  }

  sendMessage(roomId: number, userId: number, message: string) {
    return this.sendMessageFeature.sendMessage({ roomId: +roomId, userId: +userId, message: message });
  }

}


// private getRoomsByUserFeature: GetRoomsByUserFeature,
// private getUserByIdFeature: GetUserByIdFeature,
// private getMessagesByRoomFeature: GetMessagesByRoomFeature,
// private sendMessageFeature: SendMessageFeature
