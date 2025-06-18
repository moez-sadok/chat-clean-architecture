import { Inject } from "@angular/core";
import { IHttpController } from "@cca/core-controllers";
import { GET_ROOM_MESSAGES_HTTP_URL } from "@cca/core-features";

//use the router to orchestrates UI (statless)
export class GetRoomMessagesSpaClient {

  constructor(
    @Inject('GET_MESSAGES_ByRoomApiClientControllerAdapter')
    private clientControllerAdapter: IHttpController
  ) { }

  async getRoomMessages(roomId: number): Promise<any> {
    const url = `${GET_ROOM_MESSAGES_HTTP_URL}/${roomId}`;
    const res = await fetch(url).then(res => res.json());
    this.clientControllerAdapter.handle(res);
  }
  
}
