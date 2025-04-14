import { IGetMessagesByRoomPresenterOutput } from "../features/chat/get-messages-by-room/getMessagesByRoom.presenter.output";
import { IGetRoomsByUserPresenterOutput } from "../features/chat/get-rooms-by-user/getRoomsByUser.presenter.output";
import { IGetUserByIdPresenterOutput } from "../features/chat/get-user-by-id/getUserById.presenter.output";
import { ISendMessagePresenterOutput } from "../features/chat/send-message/sendMessage.presenter.output";

// Chat application presenter facade
export interface IChatAppFacadePresenterOutput
    extends IGetMessagesByRoomPresenterOutput,
    IGetRoomsByUserPresenterOutput,
    IGetUserByIdPresenterOutput,
    ISendMessagePresenterOutput { }
