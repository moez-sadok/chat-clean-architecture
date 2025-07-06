import { IGetRoomsByUserSSRView } from "../presenter/getRoomsByUser.view";
import { RoomViewModel } from "../presenter/getRoomsByUser.view.model";

export class GetRoomsByUserSSRView implements IGetRoomsByUserSSRView {

  render(rooms: RoomViewModel[]): string {
    return this.toHtml(rooms);
  }

  private toHtml(rooms: RoomViewModel[]): string {
    const style = `
    <style>
      .padding-12 {
        padding: 12px;
      }
      .cursor-pointer {
        cursor: pointer;
      }
    </style>
  `;
    let htmlString = '<ul>';
    htmlString += rooms.map(room => `
    <li class="padding-12 cursor-pointer" data-room-id="${room.roomId}" onclick="selectRoom('${room.roomId}')">
      <b>${room.name}</b>
      ${room.newMessagesNotif ? `<span>(${room.newMessagesNotif})</span>` : ''}
    </li>
  `).join('');
    htmlString += '</ul>';
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Chat Rooms</title>
        ${style}
      </head>
      <body>
        ${htmlString}
      </body>
    </html>
  `;

  }
}


//TODO change by router
//const script = ` <script>
//     function selectRoom(roomId) {
//       window.location.href = '/' + roomId;
//     }
//   </script>`;
// ----
// <body>
//     ${script}