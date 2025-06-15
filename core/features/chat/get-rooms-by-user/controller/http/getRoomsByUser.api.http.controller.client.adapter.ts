
import { IHttpController } from "../../../../../controllers";
import { IGetRoomsByUserPresenter } from "../getRoomsByUser.presenter";

export class GetUserRoomsAPIHttpControllerClientAdapter implements IHttpController {

  constructor( public presenterUi: IGetRoomsByUserPresenter) { }

  async handle(data: any): Promise<any> {
    this.presenterUi.present(data)
  }

}
