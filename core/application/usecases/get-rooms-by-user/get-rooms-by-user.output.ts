import { GetRoomsByUserResponseData } from "./get-rooms-by-user.response";
import { RoomViewModel } from "./presenter/get-rooms-by-user.view.model";

export interface IGetRoomsByUserPresenter {
    present(rooms: GetRoomsByUserResponseData[]): GetRoomsByUserResponseData[];
}

// The SSR presenter keeps the view model it built, for the controller to render.
export interface IGetRoomsByUserSSRPresenter extends IGetRoomsByUserPresenter {
    getViewModel(): RoomViewModel[];
}
