import { IHttpController } from "../../../../controllers";
import { IGetMessagesByRoomPresenterOutput } from "../get-messages-by-room.output";
import { GetMessagesOutputData } from "../get-messages-by-room.response";

// SPA side: the API response is handed to the UI presenter, which updates the view.
export class GetRoomMessagesAPIHttpControllerClientAdapter implements IHttpController<GetMessagesOutputData, void> {

  constructor(public presenter: IGetMessagesByRoomPresenterOutput) { }

  async handle(response: GetMessagesOutputData): Promise<void> {
    this.presenter.presentMessages(response.messages, { roomName: response.roomName, roomId: response.roomId });
  }

}
