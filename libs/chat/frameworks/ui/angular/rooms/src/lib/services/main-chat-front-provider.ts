import { InjectionToken } from "@angular/core";
import { ChatControllerWsHttpClientAdapterImpl, IChatController } from "@chat-clean-architecture/chat/adapters/controllers";
import { ChatUiPresenterImpl, IChatView } from "@chat-clean-architecture/chat/adapters/presenters";
import { IChatAppFacadePresenterOutput } from "@chat-clean-architecture/chat/application-business-rules/interactor";

export const CHAT_PRESENTATOR_PROVIDER = new InjectionToken<IChatAppFacadePresenterOutput>('chat.presentator');
export const CHAT_VIEW_PROVIDER = new InjectionToken<IChatView>('chat.view');
export const CHAT_CONTROLLER_PROVIDER = new InjectionToken<IChatController>('chat.controller');

export const presenterFactory = (view: IChatView) => {
    return new ChatUiPresenterImpl(view);
};

// net controller (http/ws)
export const controllerClientAdapterFactory = (presentator: IChatAppFacadePresenterOutput) => {
    return new ChatControllerWsHttpClientAdapterImpl(presentator);
};

// import { IChatAppFacadeControllerInput, IChatRepository, ChatAppFacadeImpl, IChatServerPort } from "@chat-clean-architecture/chat/application-business-rules/interactor";
// import { ChatControllerMemoryClientAdapterImpl } from "../adapters/chat-controller-memory-client-adapter";
// import { DataBaseMapper, IChatDatabase } from "@chat-clean-architecture/chat/adapters/gateways";

//export const CHAT_DB_PROVIDER = new InjectionToken<IChatDatabase>('chat.bd');
//export const CHAT_SERVER_PROVIDER_PORT = new InjectionToken<IChatServerPort>('chat.server.port.facade');
//export const CHAT_INTERACTOR_PROVIDER = new InjectionToken<IChatAppFacadeControllerInput>('chat.interactor');
//export const CHAT_DB_MAPPER_PROVIDER = new InjectionToken<IChatRepository>('chat.mapper.bd');


// export const dbMapperFactory = (db: IChatDatabase) => {
//     return new DataBaseMapper(db);
// };
// export const interactorNetworkFactory = (db: IChatRepository, presentator: IChatAppFacadePresenterOutput,chatserver: IChatServerPort) => {
//     return new ChatAppFacadeImpl(db,presentator, chatserver);
// };
// inmemory controller
// export const controllerMomoryFactory = (interactor: IChatAppFacadeControllerInput,presentator: IChatAppFacadePresenterOutput) => {
//     return new ChatControllerMemoryClientAdapterImpl(interactor,presentator);
// };



