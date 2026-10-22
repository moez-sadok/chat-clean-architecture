import { GetRoomsByUserResponseData } from "../get-rooms-by-user.response";
import { IGetRoomsByUserPresenter } from "../get-rooms-by-user.output";
import { RoomViewModel } from "./get-rooms-by-user.view.model";
import { IGetRoomsByUserView } from "./get-rooms-by-user.view";

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
