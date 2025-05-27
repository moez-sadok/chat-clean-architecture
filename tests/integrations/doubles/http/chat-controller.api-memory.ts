import { GetRoomsByUserResponseData, IGetMessagesByRoomInput, IGetRoomsByUserPresenterOutput, IGetRoomsByUserRequester, IGetUserByIdInput, ISendMessageInput } from "../../../../core/features/chat";
import { IChatHttpController } from "../../../../core/controllers/chat.controllor";
import { IGetUserRoomsHttpController } from "../../../../core/features/chat/get-rooms-by-user/controller/http/getRoomsByUser.controller.http";
import { GetRoomsByUserRequestData } from "../../../../core/features/chat/get-rooms-by-user/interactor/getRoomsByUser.request.data";


export class GetUserRoomsHttpControllerApiMemory implements IGetUserRoomsHttpController{

  constructor(public presenter: IGetRoomsByUserPresenterOutput,
    private getRoomsByUserFeature: IGetRoomsByUserRequester,
  ) {}

  async getUserRooms(input: GetRoomsByUserRequestData): Promise<GetRoomsByUserResponseData[]> {
    const res =  await this.getRoomsByUserFeature.getRoomsByUser(input);
    if(res) this.presenter.selectedRoomsByUser(res);
    return new Promise((resolve) => resolve(res));
  }

}

export class ChatHttpControllerApiMemory implements IChatHttpController {

  constructor(
    
    private getUserByIdFeature: IGetUserByIdInput,
    private getMessagesByRoomFeature: IGetMessagesByRoomInput,
    private sendMessageFeature: ISendMessageInput
  ) { }

  // getUserRooms(userId: number) {
  //   return this.getRoomsByUserFeature.getRoomsByUser({ userId: +userId });
  // }

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
