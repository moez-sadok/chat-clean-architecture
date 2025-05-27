import { GetRoomsByUserResponseData } from "../interactor/getRoomsByUser.response.data";
import { IGetRoomsByUserPresenterOutput } from "../controller/getRoomsByUser.presenter.output";
import { RoomViewModel } from "./getRoomsByUser.view.model";
import { IGetRoomsByUserView } from "./getRoomsByUser.view";

export class GetRoomsByUserPresenterUi implements IGetRoomsByUserPresenterOutput {

  constructor(public view: IGetRoomsByUserView) {}

  selectedRoomsByUser(rooms: GetRoomsByUserResponseData[]): GetRoomsByUserResponseData[] {
    const roomsVM = rooms.map((e) => { 
      return { name: e.roomName, roomId: e.roomId } as RoomViewModel; 
    })
    this.view.displayChatPageRooms(roomsVM);
    return rooms;
  }

}
