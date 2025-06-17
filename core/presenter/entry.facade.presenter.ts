import { IGetUserByIdPresenterOutput } from "../application/usecases/get-user-by-id/getUserById.presenter.output";
import { ISendMessagePresenterOutput } from "../application/usecases/send-message/sendMessage.presenter.output";

// Chat application presenter as facade
export interface IChatAppFacadePresenterOutput
    extends 
    //IGetMessagesByRoomPresenterOutput,
    //IGetRoomsByUserPresenter,
    IGetUserByIdPresenterOutput,
    ISendMessagePresenterOutput 
    { }
