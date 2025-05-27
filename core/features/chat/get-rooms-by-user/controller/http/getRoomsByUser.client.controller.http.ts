
import { IHttpController } from "../../../../../controllers";
import { GetRoomsByUserResponseData } from "../../interactor/getRoomsByUser.response.data";
import { IGetRoomsByUserPresenter } from "../getRoomsByUser.presenter";
import { GET_USER_ROOMS_HTTP_URL } from "./getRoomsByUser.constant.controller.http";
// using fetch as native js function to make http requests 
// can be implemented on the framework side (angular as service with HttpClient)
export class GetUserRoomsClientHttpController implements IHttpController {

  constructor(
    public presenter: IGetRoomsByUserPresenter,
    private serverUrl = '') { }

  handle(req: any): Promise<any> {
    const url = `${this.serverUrl}${GET_USER_ROOMS_HTTP_URL}/${req.userId}`;
    return fetch(url)
      .then(res => res.json())
      .then((res: GetRoomsByUserResponseData[]) =>
        this.presenter.selectedRoomsByUser(res)
      );
  }

}
