import { GetRoomsByUserRequestData } from "../../interactor/getRoomsByUser.request.data";
// import { IGetRoomsByUserRequester } from "../../interactor/getRoomsByUser.requester";
import { GetRoomsByUserResponseData } from "../../interactor/getRoomsByUser.response.data";
import { IGetRoomsByUserPresenterOutput } from "../getRoomsByUser.presenter.output";

export const GET_USER_ROOMS_HTTP_URL = 'api/chat-user-rooms';
export const GET_USER_ROOMS_HTTP_URI = 'chat-user-rooms';

export interface IGetUserRoomsHttpController {
  presenter : IGetRoomsByUserPresenterOutput;
  // feature: IGetRoomsByUserRequester
  getUserRooms(input: GetRoomsByUserRequestData): Promise<GetRoomsByUserResponseData[]>;
}
