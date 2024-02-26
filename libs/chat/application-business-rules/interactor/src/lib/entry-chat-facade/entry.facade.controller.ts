import { IConnectClientInput } from "../features/connect-client/connectClient.feature.input";
import { IConnectUserInput } from "../features/connect-user/connectUser.feature.input";
import { IDisconnectClientInput } from "../features/disconnect-client/disconnectClient.controller.input";
import { IGetMessagesByRoomInput } from "../features/get-messages-by-room/getMessagesByRoom.controller.input";
import { IGetRoomsByUserInput } from "../features/get-rooms-by-user/getRoomsByUser.controller.input";
import { IGetUserByIdInput } from "../features/get-user-by-id/getUserById.controller.input";
import { ISendMessageInput } from "../features/send-message/sendMessage.controller.input";

// Chat application controller facade
export interface IChatAppFacadeControllerInput
    extends IConnectClientInput,
    IConnectUserInput,
    IDisconnectClientInput,
    IGetMessagesByRoomInput,
    IGetRoomsByUserInput,
    IGetUserByIdInput,
    ISendMessageInput { }
