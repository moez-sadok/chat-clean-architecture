import { GetRoomsByUserResponseData } from "../interactor/getRoomsByUser.response.data";

export interface IGetRoomsByUserPresenter {
    selectedRoomsByUser(rooms: GetRoomsByUserResponseData[]): GetRoomsByUserResponseData[];
}