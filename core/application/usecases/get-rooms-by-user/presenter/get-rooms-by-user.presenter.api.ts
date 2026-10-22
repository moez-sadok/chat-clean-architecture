import { GetRoomsByUserResponseData } from "../get-rooms-by-user.response";
import { IGetRoomsByUserPresenter } from "../get-rooms-by-user.output";

export class GetRoomsByUserPresenterAPI implements IGetRoomsByUserPresenter {

  present(rooms: GetRoomsByUserResponseData[]): GetRoomsByUserResponseData[] {
    return rooms;
  }
  
}