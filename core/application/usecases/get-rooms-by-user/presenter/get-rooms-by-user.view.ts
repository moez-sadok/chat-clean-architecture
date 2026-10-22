import { RoomViewModel } from "./get-rooms-by-user.view.model";

export interface IGetRoomsByUserView {
  rooms: RoomViewModel[];
  render(rooms: RoomViewModel[]): void;
}

export interface IGetRoomsByUserSSRView {
  render(rooms: RoomViewModel[]): string;
}
