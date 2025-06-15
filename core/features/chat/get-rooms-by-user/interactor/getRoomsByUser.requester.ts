import { GetRoomsByUserResponseData } from "./getRoomsByUser.response.data";
import { GetRoomsByUserRequestData } from "./getRoomsByUser.request.data";
import { IGetRoomsByUserSSRPresenter } from "../controller/getRoomsByUser.presenter";

export interface IGetRoomsByUserRequester {
  getRoomsByUser(user: GetRoomsByUserRequestData): Promise<GetRoomsByUserResponseData[]>;
}

//Optional (to respect strict flow)
export interface IGetRoomsByUserSSRRequester {
  getRoomsByUser(user: GetRoomsByUserRequestData,presenter: IGetRoomsByUserSSRPresenter): void;
}
