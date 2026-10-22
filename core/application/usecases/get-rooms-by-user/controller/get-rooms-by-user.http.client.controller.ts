import { IHttpController } from "../../../../controllers";
import { IGetRoomsByUserPresenter } from "../get-rooms-by-user.output";
import { GetRoomsByUserResponseData } from "../get-rooms-by-user.response";

// SPA side: the API response is handed to the UI presenter, which updates the view.
export class GetUserRoomsAPIHttpControllerClientAdapter implements IHttpController<GetRoomsByUserResponseData[], void> {

  constructor(public presenterUi: IGetRoomsByUserPresenter) { }

  async handle(response: GetRoomsByUserResponseData[]): Promise<void> {
    this.presenterUi.present(response);
  }

}
