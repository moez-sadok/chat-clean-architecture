import { IGetRoomsByUserView } from "../presenter/get-rooms-by-user.view";
import { RoomViewModel } from "../presenter/get-rooms-by-user.view.model";

export class GetRoomsByUserClientView implements IGetRoomsByUserView {

  rooms: RoomViewModel[] = [];

  render(rooms: RoomViewModel[]): void {
    this.rooms = rooms;
  }
}