import { IGetRoomsByUserView } from "../presenter/getRoomsByUser.view";
import { RoomViewModel } from "../presenter/getRoomsByUser.view.model";

export class GetRoomsByUserClientView implements IGetRoomsByUserView {

  rooms: RoomViewModel[] = [];

  displayChatPageRooms(rooms: RoomViewModel[]): void {
    //SPA
    this.rooms = rooms;

    //SSR (Render the rooms as html)
    // const roomsHtml = rooms.map(room => `<div>${room.name} (${room.roomId})</div>`).join('');
    // return '<div class="rooms-list">' + roomsHtml + '</div>';
  }
}