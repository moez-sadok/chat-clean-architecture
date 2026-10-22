import { GetRoomsByUserResponseData } from "../interactor/getRoomsByUser.response.data";
import { RoomViewModel } from "../presenter/getRoomsByUser.view.model";

export interface IGetRoomsByUserPresenter {
    present(rooms: GetRoomsByUserResponseData[]): GetRoomsByUserResponseData[];
}

export interface IGetRoomsByUserSSRPresenter {
   getViewModel():RoomViewModel[];
   present(rooms: GetRoomsByUserResponseData[]):void;
}
