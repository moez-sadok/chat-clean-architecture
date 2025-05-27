import { GetRoomsByUserResponseData } from "../../interactor/getRoomsByUser.response.data";
import { IGetRoomsByUserRequester } from "../../interactor/getRoomsByUser.requester";
import { IGetUserRoomsHttpController } from "./getRoomsByUser.controller.http";
import { GetRoomsByUserRequestData } from "../../interactor/getRoomsByUser.request.data";
import { IGetRoomsByUserPresenterOutput } from "../getRoomsByUser.presenter.output";

//See impl on nestjs controller - using annotations
export class GetUserRoomsServerHttpController implements IGetUserRoomsHttpController {

  constructor(
    public feature: IGetRoomsByUserRequester,
    public presenter: IGetRoomsByUserPresenterOutput
  ) {}

  getUserRooms(input: GetRoomsByUserRequestData): Promise<GetRoomsByUserResponseData[]> {
    throw new Error("Method not implemented. See impl on nestjs controller - using annotations");
    // const rooms = await this.feature.getRoomsByUser(input);
    // return this.presenter.selectedRoomsByUser(rooms);
  }
}