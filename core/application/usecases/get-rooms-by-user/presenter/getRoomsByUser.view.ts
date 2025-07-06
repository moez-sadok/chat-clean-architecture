import { RoomViewModel } from "./getRoomsByUser.view.model";

export interface IGetRoomsByUserView {
  rooms: RoomViewModel[];
  render(rooms: RoomViewModel[]): void;
}

export interface IGetRoomsByUserSSRView {
  render(rooms: RoomViewModel[]): string;
}

// //generic
// export interface IView<T,R> {
//   data: T;
//   render(data: T): R;
// }
