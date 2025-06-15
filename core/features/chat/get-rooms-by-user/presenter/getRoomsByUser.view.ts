import { RoomViewModel } from "../presenter/getRoomsByUser.view.model";

export interface IGetRoomsByUserView {
  rooms: RoomViewModel[];
  render(rooms: RoomViewModel[]): void;
}

export interface IGetRoomsByUserSSRView {
  render(rooms: RoomViewModel[]): string;
}

