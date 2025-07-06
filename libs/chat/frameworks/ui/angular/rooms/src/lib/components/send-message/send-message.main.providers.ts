import { InjectionToken } from "@angular/core";
import { IHttpController } from "@cca/core-controllers";
import { sendMessagePresenterUiFactory, ISendMessageView, sendMessageAPIClientControllerAdapter, SendMessageWebView, ISendMessagePresenterOutput, IGetMessagesByRoomPresenterOutput } from "@cca/core-features";
import { SendMessageSpaClient } from "./send-message.spa.client";
import { GET_MESSAGES_BY_ROOM_PRESENTER } from "../get-room-messages/get-room-messages.main.providers";

export const SEND_MESSAGE_VIEW = new InjectionToken<ISendMessageView>('SendMessageView');
export const SEND_MESSAGE_PRESENTER = new InjectionToken<ISendMessagePresenterOutput>('SendMessagePresenter');

export const SEND_MESSAGEApiClientControllerAdapter = new InjectionToken<IHttpController>('SEND_MESSAGEApiClientControllerAdapter');
export const SEND_MESSAGE_HTTP_API_CLIENT = new InjectionToken('SEND_MESSAGE_HTTP_API_CLIENT');

export const sendMessageProviders = [
  // View
  { provide: SEND_MESSAGE_VIEW, useClass: SendMessageWebView },
  {// Presenter
    provide: SEND_MESSAGE_PRESENTER, useFactory: sendMessagePresenterUiFactory,
    deps: [SEND_MESSAGE_VIEW]
  },
  {// API client controller adapter
    provide: SEND_MESSAGEApiClientControllerAdapter, useFactory: sendMessageAPIClientControllerAdapter,
    deps: [SEND_MESSAGE_PRESENTER]
  },
  {//HTTP_API_CLIENT service (to-check)
    provide: SEND_MESSAGE_HTTP_API_CLIENT,
    useFactory: (apiClientControllerAdapter: IHttpController,getMessagePresenetr: IGetMessagesByRoomPresenterOutput ) => {
      return new SendMessageSpaClient(apiClientControllerAdapter, getMessagePresenetr);
    },
    deps: [SEND_MESSAGEApiClientControllerAdapter,GET_MESSAGES_BY_ROOM_PRESENTER]
  },
]