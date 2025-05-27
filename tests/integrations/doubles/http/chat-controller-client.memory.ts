import { IChatAppFacadePresenterOutput } from '../../../../core/presenter';
import { UserOutputData, MessageOutputData } from '../../../../core/dtos/output.chat.data';
import { IChatHttpController } from '../../../../core/controllers/chat.controllor';
import { GetRoomsByUserResponseData, IGetRoomsByUserPresenterOutput } from '../../../../core/features/chat/get-rooms-by-user';
import { IGetUserRoomsHttpController } from '../../../../core/features/chat/get-rooms-by-user/controller/http/getRoomsByUser.controller.http';
import { GetRoomsByUserRequestData } from '../../../../core/features/chat/get-rooms-by-user/interactor/getRoomsByUser.request.data';

export class GetUserRoomsHttpControllerClientMemory implements IGetUserRoomsHttpController{

  constructor(public presenter: IGetRoomsByUserPresenterOutput,
    private apicontroller: IGetUserRoomsHttpController, 
  ) {}

  async getUserRooms(input: GetRoomsByUserRequestData): Promise<GetRoomsByUserResponseData[]> {
    const res =  await this.apicontroller.getUserRooms(input);
    if(res) this.presenter.selectedRoomsByUser(res);
    return new Promise((resolve) => resolve(res));
  }

}

export class ChatControllerHttpClientMemory implements IChatHttpController {

  constructor(
    private apicontroller: IChatHttpController, 
    private presentator: IChatAppFacadePresenterOutput) { }

  async getUserById(userId: number): Promise<UserOutputData | null> {
    const res = await this.apicontroller.getUserById(userId);
    if(res) this.presentator.selectedUser(res);
    return new Promise((resolve) => resolve(res));
  }

  // async getUserRooms(userId: number): Promise<GetRoomsByUserResponseData[]> {
  //   const res =  await this.apicontroller.getUserRooms(userId);
  //   if(res) this.presentator.selectedRoomsByUser(res);
  //   return new Promise((resolve) => resolve(res));
  // }

  async getRoomMessages(roomId: number, roomName: string, userId: number): Promise<MessageOutputData[]> {
    const room = { userId: userId, roomId: roomId, roomName: roomName }; //as GetRoomMessagesInputData
    const res =  await this.apicontroller.getRoomMessages(roomId,roomName,userId);
    if(res) this.presentator.selectChatRoomsMessages(res,room);
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
