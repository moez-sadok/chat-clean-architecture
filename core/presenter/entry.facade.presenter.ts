import { IGetMessagesByRoomPresenterOutput } from "../application/usecases/get-messages-by-room/getMessagesByRoom.presenter.output";
// import { IGetRoomsByUserPresenter } from "../features/chat/get-rooms-by-user";
// import { IGetRoomsByUserPresenter } from "../features/chat/get-rooms-by-user/getRoomsByUser.presenter.output";
import { IGetUserByIdPresenterOutput } from "../application/usecases/get-user-by-id/getUserById.presenter.output";
import { ISendMessagePresenterOutput } from "../application/usecases/send-message/sendMessage.presenter.output";

// Chat application presenter facade
export interface IChatAppFacadePresenterOutput
    extends IGetMessagesByRoomPresenterOutput,
    //IGetRoomsByUserPresenter,
    IGetUserByIdPresenterOutput,
    ISendMessagePresenterOutput { }
