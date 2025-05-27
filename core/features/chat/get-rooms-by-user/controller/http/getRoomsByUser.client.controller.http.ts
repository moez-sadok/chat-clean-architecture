// import { IHttpController } from "../../../../../controllers";
import { GetRoomsByUserRequestData } from "../../interactor/getRoomsByUser.request.data";
import { GetRoomsByUserResponseData } from "../../interactor/getRoomsByUser.response.data";
import { IGetRoomsByUserPresenterOutput } from "../getRoomsByUser.presenter.output";
import { GET_USER_ROOMS_HTTP_URL, IGetUserRoomsHttpController } from "./getRoomsByUser.controller.http";

export class GetUserRoomsClientHttpController implements IGetUserRoomsHttpController {

  constructor(
    public presenter: IGetRoomsByUserPresenterOutput,
    private serverUrl = '') { }

  getUserRooms(input: GetRoomsByUserRequestData): Promise<GetRoomsByUserResponseData[]> {
    const url = `${this.serverUrl}${GET_USER_ROOMS_HTTP_URL}/${input.userId}`;
    return fetch(url)
      .then(res => res.json())
      .then((res: GetRoomsByUserResponseData[]) =>
        this.presenter.selectedRoomsByUser(res)
      );
  }
}

// export class NativeGetUserRoomsClientHttpController implements IHttpController {

//   constructor(
//     public presenter: IGetRoomsByUserPresenterOutput,
//     private serverUrl = '') { }

//   handle(req: any): Promise<any> {
//     const url = `${this.serverUrl}${GET_USER_ROOMS_HTTP_URL}/${req.userId}`;
//     return fetch(url)
//       .then(res => res.json())
//       .then((res: GetRoomsByUserResponseData[]) =>
//         this.presenter.selectedRoomsByUser(res)
//       );
//   }

// }