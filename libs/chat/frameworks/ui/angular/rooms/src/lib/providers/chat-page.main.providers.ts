import { InjectionToken } from "@angular/core";
import { IChatWsController } from "@cca/core-controllers";
import { IGetMessagesByRoomPresenterOutput } from "@cca/core-features";
import { ChatControllerWsClientAdapterImpl } from "@cca/drivers/socketIo/client";

import { GET_MESSAGES_BY_ROOM_PRESENTER } from "../components/get-room-messages/get-room-messages.main.providers";

// Refactoring ... 
export const CHAT_SERVER_CONTROLLER_PROVIDER = new InjectionToken<IChatWsController>('chat.server.controller');

export const controllerClientWsAdapterFactory = (presentator: IGetMessagesByRoomPresenterOutput) => {
  return new ChatControllerWsClientAdapterImpl(presentator);
};

export const getChatPageFacadeProviders = [
    {
      provide: CHAT_SERVER_CONTROLLER_PROVIDER,
      useFactory: controllerClientWsAdapterFactory,
      deps: [GET_MESSAGES_BY_ROOM_PRESENTER]
    }
]