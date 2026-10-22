import { GetRoomsByUserResponseData } from "../get-rooms-by-user.response";
import { IGetRoomsByUserSSRPresenter } from "../get-rooms-by-user.output";
import { RoomViewModel } from "./get-rooms-by-user.view.model";
import { IGetRoomsByUserSSRView } from "./get-rooms-by-user.view";

export class GetRoomsByUserPresenterSSR implements IGetRoomsByUserSSRPresenter {

  private roomsViewModel: RoomViewModel[] = [];

  constructor(public view: IGetRoomsByUserSSRView) { }

  present(rooms: GetRoomsByUserResponseData[]): GetRoomsByUserResponseData[] {
    this.roomsViewModel = rooms.map((e) => {
      return { name: e.roomName, roomId: e.roomId } as RoomViewModel;
    });
    return rooms;
  }

  getViewModel(): RoomViewModel[] {
    return this.roomsViewModel;
  }

}
