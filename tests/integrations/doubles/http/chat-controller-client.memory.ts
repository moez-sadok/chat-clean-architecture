import { GetRoomsByUserResponseData, IGetRoomsByUserPresenter } from '../../../../core/application/usecases/get-rooms-by-user';
import { GetRoomsByUserRequestData } from '../../../../core/application/usecases/get-rooms-by-user/interactor/getRoomsByUser.request.data';
import { IHttpController } from '../../../../core/controllers';
import { GetMessagesOutputData, IGetMessagesByRoomPresenterOutput, IGetUserByIdPresenterOutput, ISendMessagePresenterOutput, UserOutputData } from '../../../../core/application';
import { GetRoomMessagesInputData } from '../../../../core/application/usecases/get-messages-by-room/interactor/getMessagesByRoom.request.data';
import { SendMessageInputData } from '../../../../core/application/usecases/send-message/interactor/send-message.request.data';
import { SendMessageOutputData } from '../../../../core/application/usecases/send-message/interactor/send-message.response.data';
import { GetUserByIdInputData } from '../../../../core/application/usecases/get-user-by-id/interactor/getUserById.request.data';

export class GetUserRoomsHttpControllerClientMemory implements IHttpController{

  constructor(public presenter: IGetRoomsByUserPresenter,
    private apiGetUserRoomsHttpController: IHttpController, 
  ) {}

  async handle(input: GetRoomsByUserRequestData): Promise<GetRoomsByUserResponseData[]> {
    const res =  await this.apiGetUserRoomsHttpController.handle(input);
    if(res) this.presenter.present(res);
    return new Promise((resolve) => resolve(res));
  }

}

export class GetRoomMessagesHttpControllerClientMemory implements IHttpController{

  constructor(public presenter: IGetMessagesByRoomPresenterOutput,
    private apiGetMessagesRoomHttpController: IHttpController, 
  ) {}

  async handle(input: GetRoomMessagesInputData): Promise<GetMessagesOutputData> {
    //  const room = { userId: input.userId, roomId: input., roomName: roomName }; //as GetRoomMessagesInputData
    const res =  await this.apiGetMessagesRoomHttpController.handle(input);
    if(res) this.presenter.presentMessages(res.messages,{roomId: res.roomId, roomName: res.roomName});
    return new Promise((resolve) => resolve(res));
  }

}

export class GetUserByIdHttpControllerClientMemory implements IHttpController{

  constructor(public presenter: IGetUserByIdPresenterOutput,
    private apiGetUserByIdHttpController: IHttpController, 
  ) {}

  async handle(input: GetUserByIdInputData): Promise<UserOutputData | null> {
    //  const room = { userId: input.userId, roomId: input., roomName: roomName }; //as GetRoomMessagesInputData
    const res =  await this.apiGetUserByIdHttpController.handle(input);
    if(res) this.presenter.selectedUser(res);
    return new Promise((resolve) => resolve(res));
  }

}

export class SendMessageHttpControllerClientMemory implements IHttpController{

  constructor(
    public presenter: ISendMessagePresenterOutput,
    private apiSendMessageHttpController: IHttpController, 
  ) {}

  async handle(input: SendMessageInputData): Promise<SendMessageOutputData | null> {
    // const msg = { roomId: roomId, userId: userId, message: message };
    const res =  await this.apiSendMessageHttpController.handle(input);
    //@ts-ignore
    // this.presentator.receiveNewMessage(res);
    return new Promise((resolve) => resolve(res));
  }

}