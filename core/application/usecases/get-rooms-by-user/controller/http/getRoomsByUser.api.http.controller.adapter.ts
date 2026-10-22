import { IHttpController } from "../../../../../controllers";
import { GetRoomsByUserRequestData } from "../../interactor/getRoomsByUser.request.data";
import { IGetRoomsByUserRequester } from "../../interactor/getRoomsByUser.requester";
import { GetRoomsByUserResponseData } from "../../interactor/getRoomsByUser.response.data";

// The use case presents through its output port: the controller returns what it presented.
export class GetUserRoomsApiHttpControllerAdapter implements IHttpController {

  constructor(public usecase: IGetRoomsByUserRequester) {}

  handle(input: GetRoomsByUserRequestData): Promise<GetRoomsByUserResponseData[]> {
    return this.usecase.getRoomsByUser(input);
  }

}
