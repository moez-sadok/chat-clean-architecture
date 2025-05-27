import { GetRoomsByUserResponseData } from "../interactor/getRoomsByUser.response.data";
import { IGetRoomsByUserPresenterOutput } from "../controller/getRoomsByUser.presenter.output";

export class GetRoomsByUserPresenterAPI implements IGetRoomsByUserPresenterOutput {
   selectedRoomsByUser(rooms: GetRoomsByUserResponseData[]): GetRoomsByUserResponseData[] {
    return rooms;
  }
}