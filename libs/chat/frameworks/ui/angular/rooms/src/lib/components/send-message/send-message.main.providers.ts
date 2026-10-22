import { InjectionToken } from "@angular/core";
import { IHttpController } from "@cca/core-controllers";
import { sendMessagePresenterUiFactory, ISendMessageView, sendMessageAPIClientControllerAdapter, SendMessageWebView, ISendMessagePresenterOutput, SendMessageOutputData } from "@cca/core-features";
import { SendMessageSpaClient } from "./send-message.spa.client";

export const SEND_MESSAGE_VIEW = new InjectionToken<ISendMessageView>('SendMessageView');
export const SEND_MESSAGE_PRESENTER = new InjectionToken<ISendMessagePresenterOutput>('SendMessagePresenter');

export const SEND_MESSAGE_HTTP_CLIENT_CONTROLLER = new InjectionToken<IHttpController<SendMessageOutputData, void>>('SEND_MESSAGE_HTTP_CLIENT_CONTROLLER');
export const SEND_MESSAGE_HTTP_API_CLIENT = new InjectionToken<SendMessageSpaClient>('SEND_MESSAGE_HTTP_API_CLIENT');

export const sendMessageProviders = [
  // View
  { provide: SEND_MESSAGE_VIEW, useClass: SendMessageWebView },
  {// Presenter
    provide: SEND_MESSAGE_PRESENTER, useFactory: sendMessagePresenterUiFactory,
    deps: [SEND_MESSAGE_VIEW]
  },
  {// API client controller adapter
    provide: SEND_MESSAGE_HTTP_CLIENT_CONTROLLER, useFactory: sendMessageAPIClientControllerAdapter,
    deps: [SEND_MESSAGE_PRESENTER]
  },
  {// SPA client
    provide: SEND_MESSAGE_HTTP_API_CLIENT,
    useFactory: (clientController: IHttpController<SendMessageOutputData, void>) => new SendMessageSpaClient(clientController),
    deps: [SEND_MESSAGE_HTTP_CLIENT_CONTROLLER]
  },
]
