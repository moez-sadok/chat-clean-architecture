import { GetRoomsByUserResponseData } from "../interactor/getRoomsByUser.response.data";
import { RoomViewModel } from "../presenter/getRoomsByUser.view.model";

export interface IGetRoomsByUserPresenter {
    present(rooms: GetRoomsByUserResponseData[]): GetRoomsByUserResponseData[];
}

// The SSR presenter keeps the view model it built, for the controller to render.
export interface IGetRoomsByUserSSRPresenter extends IGetRoomsByUserPresenter {
    getViewModel(): RoomViewModel[];
}
