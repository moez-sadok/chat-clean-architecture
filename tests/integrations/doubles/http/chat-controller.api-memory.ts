import { GetMessagesOutputData, GetRoomsByUserResponseData, IGetMessagesByRoomInput, IGetMessagesByRoomPresenterOutput, IGetRoomsByUserPresenter, IGetRoomsByUserRequester, IGetUserByIdInput, IGetUserByIdPresenterOutput, ISendMessageInput, ISendMessagePresenterOutput, UserOutputData } from "../../../../core/application";
import { GetRoomsByUserRequestData } from "../../../../core/application/usecases/get-rooms-by-user/interactor/getRoomsByUser.request.data";
import { IHttpController } from "../../../../core/controllers";
import { GetRoomMessagesInputData } from "../../../../core/application/usecases/get-messages-by-room/interactor/getMessagesByRoom.request.data";
import { GetUserByIdInputData } from "../../../../core/application/usecases/get-user-by-id/interactor/getUserById.request.data";
import { SendMessageInputData } from "../../../../core/application/usecases/send-message/interactor/send-message.request.data";
import { SendMessageOutputData } from "../../../../core/application/usecases/send-message/interactor/send-message.response.data";

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


export class GetUserByIdHttpControllerApiMemory implements IHttpController{

  constructor(public presenter: IGetUserByIdPresenterOutput,
         private getUserByIdFeature: IGetUserByIdInput
  ) {}

  async handle(input: GetUserByIdInputData): Promise<UserOutputData | null> {
    const res =  await this.getUserByIdFeature.getUser(input.userId);
    if(res) this.presenter.selectedUser(res);
    return new Promise((resolve) => resolve(res));
  }

}

export class SendMessageHttpControllerApiMemory implements IHttpController{

  constructor(
    public presenter: ISendMessagePresenterOutput,
    private sendMessageFeature: ISendMessageInput
  ) {}

  async handle(input: SendMessageInputData): Promise<SendMessageOutputData | null> {
    const res =  await this.sendMessageFeature.sendMessage(input);
    return new Promise((resolve) => resolve(res));
  }

}