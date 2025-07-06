import { GetRoomsByUserResponseData } from "../interactor/getRoomsByUser.response.data";
import { IGetRoomsByUserPresenter } from "../controller/getRoomsByUser.presenter";

export class GetRoomsByUserPresenterAPI implements IGetRoomsByUserPresenter {

  present(rooms: GetRoomsByUserResponseData[]): GetRoomsByUserResponseData[] {
    return rooms;
  }
  
}