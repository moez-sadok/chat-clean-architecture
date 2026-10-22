import { IHttpController } from "@cca/core-controllers";
import { GET_ROOM_MESSAGES_HTTP_URL, GetMessagesOutputData } from "@cca/core-features";

// fetches the API and hands the response to the use case's client controller, which presents it
export class GetRoomMessagesSpaClient {

  constructor(
    private clientControllerAdapter: IHttpController<GetMessagesOutputData, void>
  ) { }

  async getRoomMessages(roomId: number): Promise<GetMessagesOutputData> {
    const url = `${GET_ROOM_MESSAGES_HTTP_URL}/${roomId}`;
    const res: GetMessagesOutputData = await fetch(url).then(res => res.json());
    await this.clientControllerAdapter.handle(res);
    return res;
  }
  
}
