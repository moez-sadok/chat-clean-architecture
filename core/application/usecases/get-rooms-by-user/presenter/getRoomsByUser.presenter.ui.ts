import { GetRoomsByUserResponseData } from "../interactor/getRoomsByUser.response.data";
import { IGetRoomsByUserPresenter } from "../controller/getRoomsByUser.presenter";
import { RoomViewModel } from "./getRoomsByUser.view.model";
import { IGetRoomsByUserView } from "./getRoomsByUser.view";

export class GetRoomsByUserPresenterUi implements IGetRoomsByUserPresenter {

  constructor(public view: IGetRoomsByUserView) {}

  present(rooms: GetRoomsByUserResponseData[]): GetRoomsByUserResponseData[] {
    const roomsVM = rooms.map((e) => { 
      return { name: e.roomName, roomId: e.roomId } as RoomViewModel; 
    })
    this.view.render(roomsVM);
    return rooms;
  }

}
