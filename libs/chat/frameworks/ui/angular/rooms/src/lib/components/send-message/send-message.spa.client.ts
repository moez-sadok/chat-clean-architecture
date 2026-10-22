import { IHttpController } from "@cca/core-controllers";
import { SEND_MESSAGE_HTTP_URL, SendMessageOutputData } from "@cca/core-features";

// Posts the message, hands the response to the send-message client controller and returns it.
// Showing the sent message in the room's list is not its job: the page composes the two use cases.
export class SendMessageSpaClient {

  constructor(private clientController: IHttpController<SendMessageOutputData, void>) { }

  async sendMessage(roomId: number, userId: number, message: string): Promise<SendMessageOutputData> {
    const response: SendMessageOutputData = await fetch(SEND_MESSAGE_HTTP_URL, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ roomId, userId, message })
    }).then(res => res.json());
    await this.clientController.handle(response);
    return response;
  }

}
