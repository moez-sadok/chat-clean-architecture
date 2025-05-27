import { GetRoomsByUserResponseData } from "../interactor/getRoomsByUser.response.data";

export interface IGetRoomsByUserPresenterOutput {
    selectedRoomsByUser(rooms: GetRoomsByUserResponseData[]): GetRoomsByUserResponseData[];
}