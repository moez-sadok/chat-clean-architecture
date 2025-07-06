import { Inject } from "@angular/core";
import { IHttpController } from "@cca/core-controllers";
import { IGetMessagesByRoomPresenterOutput, SEND_MESSAGE_HTTP_URL } from "@cca/core-features";

//use the router to orchestrates UI (statless)
export class SendMessageSpaClient {

  constructor(
    @Inject('SEND_MESSAGEApiClientControllerAdapter')
    private clientControllerAdapter: IHttpController,
    //To-check
    private getMessagesRoomPresentator: IGetMessagesByRoomPresenterOutput
  ) { }

  async sendMessage(roomId: number, userId: number, message: string) {
    const msg = { roomId: roomId, userId: userId, message: message };
    const res= await fetch(SEND_MESSAGE_HTTP_URL, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(msg)
    }).then(res => res.json());
    this.clientControllerAdapter.handle(res);
    this.getMessagesRoomPresentator.presentNewMessage(res);
  }
  
}
