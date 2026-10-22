import { InjectionToken } from "@angular/core";
import { IHttpController } from "@cca/core-controllers";
import { Router } from "@angular/router";
import { GetRoomMessagesSpaClient } from "./get-room-messages.spa.client";
import { getMessagesByRoomAPIClientControllerAdapter, GetMessagesOutputData } from "@cca/core-features";
import { GET_MESSAGES_BY_ROOM_PRESENTER } from "../../providers/shared-get-messages.presenter.provider";

export const GET_MESSAGES_BY_ROOM_HTTP_CLIENT_CONTROLLER = new InjectionToken<IHttpController<GetMessagesOutputData, void>>('GET_MESSAGES_BY_ROOM_HTTP_CLIENT_CONTROLLER');
export const GET_MESSAGES_BY_ROOM_HTTP_API_CLIENT = new InjectionToken<GetRoomMessagesSpaClient>('GetMessagesByRoomHttpApiClient');

export const getMessagesByRoomProviders = [
  {// API client controller adapter (to-check)
    provide: GET_MESSAGES_BY_ROOM_HTTP_CLIENT_CONTROLLER, useFactory: getMessagesByRoomAPIClientControllerAdapter,
    deps: [GET_MESSAGES_BY_ROOM_PRESENTER]
  },
  {//HTTP_API_CLIENT service
    provide: GET_MESSAGES_BY_ROOM_HTTP_API_CLIENT,
    useFactory: (apiClientControllerAdapter: IHttpController<GetMessagesOutputData, void>) => {
      return new GetRoomMessagesSpaClient(apiClientControllerAdapter);
    },
    deps: [GET_MESSAGES_BY_ROOM_HTTP_CLIENT_CONTROLLER, Router]
  },
]