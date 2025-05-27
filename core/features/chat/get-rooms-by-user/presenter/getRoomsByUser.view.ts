import { RoomViewModel } from "../presenter/getRoomsByUser.view.model";

export interface IGetRoomsByUserView {
  rooms: RoomViewModel[];
  displayChatPageRooms(rooms: RoomViewModel[]): void;
}
