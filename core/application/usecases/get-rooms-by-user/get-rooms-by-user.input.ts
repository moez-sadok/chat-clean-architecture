import { GetRoomsByUserResponseData } from "./get-rooms-by-user.response";
import { GetRoomsByUserRequestData } from "./get-rooms-by-user.request";

export interface IGetRoomsByUserRequester {
  getRoomsByUser(user: GetRoomsByUserRequestData): Promise<GetRoomsByUserResponseData[]>;
}
