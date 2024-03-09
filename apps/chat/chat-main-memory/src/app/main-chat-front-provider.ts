import { InjectionToken } from "@angular/core";
import { ChatControllerMemoryImpl, IChatController } from "@chat-clean-architecture/chat/adapters/controllers";
import { ChatUiPresenterImpl, IChatView } from "@chat-clean-architecture/chat/adapters/presenters";
import { IChatAppFacadePresenterOutput } from "@chat-clean-architecture/chat/application-business-rules/interactor";
import { IChatAppFacadeControllerInput, IChatRepository, ChatAppFacadeImpl, IChatServerPort } from "@chat-clean-architecture/chat/application-business-rules/interactor";
import { DataBaseMapper, IChatDatabase } from "@chat-clean-architecture/chat/adapters/gateways";

export const CHAT_PRESENTATOR_PROVIDER = new InjectionToken<IChatAppFacadePresenterOutput>('chat.presentator');
export const CHAT_VIEW_PROVIDER = new InjectionToken<IChatView>('chat.view');
export const CHAT_CONTROLLER_PROVIDER = new InjectionToken<IChatController>('chat.controller');
export const CHAT_DB_PROVIDER = new InjectionToken<IChatDatabase>('chat.bd');
export const CHAT_SERVER_PROVIDER_PORT = new InjectionToken<IChatServerPort>('chat.server.port.facade');
export const CHAT_INTERACTOR_PROVIDER = new InjectionToken<IChatAppFacadeControllerInput>('chat.interactor');
export const CHAT_DB_MAPPER_PROVIDER = new InjectionToken<IChatRepository>('chat.mapper.bd');

export const presenterFactory = (view: IChatView) => {
    return new ChatUiPresenterImpl(view);
};

export const dbMapperFactory = (db: IChatDatabase) => {
    return new DataBaseMapper(db);
};
export const interactorNetworkFactory = (db: IChatRepository, presentator: IChatAppFacadePresenterOutput,chatserver: IChatServerPort) => {
    return new ChatAppFacadeImpl(db,presentator, chatserver);
};

//inmemory controller
export const controllerMomoryFactory = (interactor: IChatAppFacadeControllerInput,presentator: IChatAppFacadePresenterOutput) => {
    return new ChatControllerMemoryImpl(interactor,presentator)
};



