import { IChatAppFacadePresenterOutput } from '../../../../core/presenter';
import { UserOutputData } from '../../../../core/dtos/output.chat.data';
import { IChatHttpController } from '../../../../core/controllers/chat.controllor';
import { GetRoomsByUserResponseData, IGetRoomsByUserPresenter } from '../../../../core/application/usecases/get-rooms-by-user';
import { GetRoomsByUserRequestData } from '../../../../core/application/usecases/get-rooms-by-user/interactor/getRoomsByUser.request.data';
import { IHttpController } from '../../../../core/controllers';
import { GetMessagesOutputData, IGetMessagesByRoomPresenterOutput } from '../../../../core/application/usecases';
import { GetRoomMessagesInputData } from '../../../../core/application/usecases/get-messages-by-room/interactor/getMessagesByRoom.request.data';

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

//Refactoring ...
export class ChatControllerHttpClientMemory implements IChatHttpController {

  constructor(
    private apicontroller: IChatHttpController, 
    private presentator: IChatAppFacadePresenterOutput) { }

  async getUserById(userId: number): Promise<UserOutputData | null> {
    const res = await this.apicontroller.getUserById(userId);
    if(res) this.presentator.selectedUser(res);
    return new Promise((resolve) => resolve(res));
  }

  async sendMessage(roomId: number, userId: number, message: string) {
    const msg = { roomId: roomId, userId: userId, message: message };
    const res =  await this.apicontroller.sendMessage(roomId,userId,message);
    //@ts-ignore
    this.presentator.receiveNewMessage(res);
    return new Promise((resolve) => resolve(res));
  }

}
