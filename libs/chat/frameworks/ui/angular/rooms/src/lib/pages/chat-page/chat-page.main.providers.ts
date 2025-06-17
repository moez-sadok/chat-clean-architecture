import { InjectionToken } from "@angular/core";
import { IChatHttpController, IChatWsController, ChatControllerHttpClientAdapterImpl, ChatControllerWsClientAdapterImpl } from "@cca/core-controllers";
import { IChatAppFacadePresenterOutput, IChatView, ChatUiPresenterImpl } from "@cca/core-presenters";
import { UserWebViewClientImpl } from "@cca/core-views";

export const CHAT_PRESENTATOR_PROVIDER = new InjectionToken<IChatAppFacadePresenterOutput>('chat.presentator');
export const CHAT_VIEW_PROVIDER = new InjectionToken<IChatView>('chat.view');
export const CHAT_CONTROLLER_PROVIDER = new InjectionToken<IChatHttpController>('chat.controller');
export const CHAT_SERVER_CONTROLLER_PROVIDER = new InjectionToken<IChatWsController>('chat.server.controller');

export const presenterFactory = (view: IChatView) => {
  return new ChatUiPresenterImpl(view);
};

// net controller (http/ws)
export const controllerClientAdapterFactory = (presentator: IChatAppFacadePresenterOutput) => {
  return new ChatControllerHttpClientAdapterImpl(presentator);
};

export const controllerClientWsAdapterFactory = (presentator: IChatAppFacadePresenterOutput) => {
  return new ChatControllerWsClientAdapterImpl(presentator);
};

export const getChatPageFacadeProviders = [
    { provide: CHAT_VIEW_PROVIDER, useClass: UserWebViewClientImpl },
    {
      provide: CHAT_PRESENTATOR_PROVIDER, useFactory: presenterFactory,
      deps: [CHAT_VIEW_PROVIDER]
    },
    {
      provide: CHAT_CONTROLLER_PROVIDER,
      useFactory: controllerClientAdapterFactory,
      deps: [CHAT_PRESENTATOR_PROVIDER]
    },
    {
      provide: CHAT_SERVER_CONTROLLER_PROVIDER,
      useFactory: controllerClientWsAdapterFactory,
      deps: [CHAT_PRESENTATOR_PROVIDER]
    }
]