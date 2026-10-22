import { IHttpController } from "../../../../controllers";
import { GetRoomsByUserRequestData } from "../get-rooms-by-user.request";
import { IGetRoomsByUserRequester } from "../get-rooms-by-user.input";
import { GetRoomsByUserResponseData } from "../get-rooms-by-user.response";

// The use case presents through its output port: the controller returns what it presented.
export class GetUserRoomsApiHttpControllerAdapter implements IHttpController<GetRoomsByUserRequestData, GetRoomsByUserResponseData[]> {

  constructor(public usecase: IGetRoomsByUserRequester) {}

  handle(input: GetRoomsByUserRequestData): Promise<GetRoomsByUserResponseData[]> {
    return this.usecase.getRoomsByUser(input);
  }

}
