import { IGetRoomsByUserView } from "../presenter/getRoomsByUser.view";
import { RoomViewModel } from "../presenter/getRoomsByUser.view.model";

export class GetRoomsByUserClientView implements IGetRoomsByUserView {

  rooms: RoomViewModel[] = [];

  render(rooms: RoomViewModel[]): void {
    this.rooms = rooms;
  }
}