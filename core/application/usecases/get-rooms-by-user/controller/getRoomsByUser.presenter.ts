import { GetRoomsByUserResponseData } from "../interactor/getRoomsByUser.response.data";
import { RoomViewModel } from "../presenter/getRoomsByUser.view.model";

export interface IGetRoomsByUserPresenter {
    present(rooms: GetRoomsByUserResponseData[]): GetRoomsByUserResponseData[];
}

export interface IGetRoomsByUserSSRPresenter {
   getViewModel():RoomViewModel[];
   present(rooms: GetRoomsByUserResponseData[]):void;
}

//generic presenter interface for ssr
// export interface ISSRPresenter<T,R> {
//    getViewModel():T;
//    present(rooms: R):void;
// }

//generic presenter interface for ui
// export interface IUiPresenter<R> {
//    present(rooms: R):R;
// }