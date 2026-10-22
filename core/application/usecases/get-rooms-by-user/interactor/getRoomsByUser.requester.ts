import { GetRoomsByUserResponseData } from "./getRoomsByUser.response.data";
import { GetRoomsByUserRequestData } from "./getRoomsByUser.request.data";

export interface IGetRoomsByUserRequester {
  getRoomsByUser(user: GetRoomsByUserRequestData): Promise<GetRoomsByUserResponseData[]>;
}
