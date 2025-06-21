import { GetMessagesOutputData, GetRoomsByUserResponseData, IGetMessagesByRoomInput, IGetMessagesByRoomPresenterOutput, IGetRoomsByUserPresenter, IGetRoomsByUserRequester, IGetUserByIdInput, ISendMessageInput } from "../../../../core/application/usecases";
import { IChatHttpController } from "../../../../core/controllers/chat.controllor";
import { GetRoomsByUserRequestData } from "../../../../core/application/usecases/get-rooms-by-user/interactor/getRoomsByUser.request.data";
import { IHttpController } from "../../../../core/controllers";
import { GetRoomMessagesInputData } from "../../../../core/application/usecases/get-messages-by-room/interactor/getMessagesByRoom.request.data";

export class GetUserRoomsHttpControllerApiMemory implements IHttpController{

  constructor(public presenter: IGetRoomsByUserPresenter,
    private getRoomsByUserFeature: IGetRoomsByUserRequester,
  ) {}

  async handle(input: GetRoomsByUserRequestData): Promise<GetRoomsByUserResponseData[]> {
    const res =  await this.getRoomsByUserFeature.getRoomsByUser(input);
    if(res) this.presenter.present(res);
    return new Promise((resolve) => resolve(res));
  }

}

export class GetMessagesRoomHttpControllerApiMemory implements IHttpController{

  constructor(public presenter: IGetMessagesByRoomPresenterOutput,
    private usecase: IGetMessagesByRoomInput,
  ) {}

  async handle(input: GetRoomMessagesInputData): Promise<GetMessagesOutputData> {
    const res =  await this.usecase.getChatRoomsMessages(input);
    if(res) this.presenter.presentMessages(res.messages,{roomId:res.roomId,roomName:res.roomName});
    return new Promise((resolve) => resolve(res));
  }

}

//Refactoring ... (to split)
export class ChatHttpControllerApiMemory implements IChatHttpController {

  constructor(
    private getUserByIdFeature: IGetUserByIdInput,
    private sendMessageFeature: ISendMessageInput
  ) { }

  getUserById(userId: number) {
    return this.getUserByIdFeature.getUser(+userId);
  }

  sendMessage(roomId: number, userId: number, message: string) {
    return this.sendMessageFeature.sendMessage({ roomId: +roomId, userId: +userId, message: message });
  }

  // getRoomMessages(roomId: number, roomName: string) {
  //   //+query.userId
  //   return this.getMessagesByRoomFeature.getChatRoomsMessages({ roomId: +roomId, roomName: roomName });
  // }
}
