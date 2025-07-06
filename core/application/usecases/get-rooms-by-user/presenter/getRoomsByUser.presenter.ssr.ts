import { GetRoomsByUserResponseData } from "../interactor/getRoomsByUser.response.data";
import { IGetRoomsByUserSSRPresenter } from "../controller/getRoomsByUser.presenter";
import { RoomViewModel } from "./getRoomsByUser.view.model";
import { IGetRoomsByUserSSRView } from "./getRoomsByUser.view";

export class GetRoomsByUserPresenterSSR implements IGetRoomsByUserSSRPresenter {

  private roomsViewModel: RoomViewModel[] = [];

  constructor(public view: IGetRoomsByUserSSRView) { }

  present(rooms: GetRoomsByUserResponseData[]): void {
    this.roomsViewModel = rooms.map((e) => {
      return { name: e.roomName, roomId: e.roomId } as RoomViewModel;
    })
  }

  getViewModel(): RoomViewModel[] {
    return this.roomsViewModel;
  }

}
