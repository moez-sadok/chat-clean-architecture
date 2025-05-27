import { GetRoomsByUserResponseData, IGetMessagesByRoomInput, IGetRoomsByUserPresenter, IGetRoomsByUserRequester, IGetUserByIdInput, ISendMessageInput } from "../../../../core/features/chat";
import { IChatHttpController } from "../../../../core/controllers/chat.controllor";
import { GetRoomsByUserRequestData } from "../../../../core/features/chat/get-rooms-by-user/interactor/getRoomsByUser.request.data";
import { IHttpController } from "../../../../core/controllers";

export class GetUserRoomsHttpControllerApiMemory implements IHttpController{

  constructor(public presenter: IGetRoomsByUserPresenter,
    private getRoomsByUserFeature: IGetRoomsByUserRequester,
  ) {}

  async handle(input: GetRoomsByUserRequestData): Promise<GetRoomsByUserResponseData[]> {
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
