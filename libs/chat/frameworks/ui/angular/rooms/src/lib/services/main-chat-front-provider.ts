import { InjectionToken } from "@angular/core";
import { ChatControllerMemoryImpl, IChatApiController } from "@chat-clean-architecture/chat/adapters/controllers";
import { DataBaseMapper, IChatDatabase } from "@chat-clean-architecture/chat/adapters/gateways";
import { ChatUiPresenterImpl, IChatView } from "@chat-clean-architecture/chat/adapters/presenters";
import { IChatAppFacadeControllerInput, IChatAppFacadePresenterOutput, IChatRepository, ChatServerPortImpl, ChatAppFacadeImpl, IChatServerPort } from "@chat-clean-architecture/chat/application-business-rules/interactor";
import { HttpClient } from "@angular/common/http";
import { ChatControllerWsHttpClientAdapterImpl } from "../adapters/chat-controller-ws-http-client-adapter";

export const CHAT_SERVER_PROVIDER_PORT = new InjectionToken<IChatServerPort>('chat.server.port.facade');
export const CHAT_INTERACTOR_PROVIDER = new InjectionToken<IChatAppFacadeControllerInput>('chat.interactor');
export const CHAT_DB_PROVIDER = new InjectionToken<IChatDatabase>('chat.bd');
export const CHAT_DB_MAPPER_PROVIDER = new InjectionToken<IChatRepository>('chat.mapper.bd');
export const CHAT_PRESENTATOR_PROVIDER = new InjectionToken<IChatAppFacadePresenterOutput>('chat.presentator');
export const CHAT_VIEW_PROVIDER = new InjectionToken<IChatView>('chat.view');
export const CHAT_CONTROLLER_PROVIDER = new InjectionToken<IChatApiController>('chat.controller');

export const dbMapperFactory = (db: IChatDatabase) => {
    return new DataBaseMapper(db);
};

export const chatServerFactory = (repository: IChatRepository) => {
    return new ChatServerPortImpl(repository);
};

export const presenterFactory = (view: IChatView) => {
    return new ChatUiPresenterImpl(view);
};

export const interactorNetworkFactory = (db: IChatRepository, presentator: IChatAppFacadePresenterOutput,chatserver: IChatServerPort) => {
    return new ChatAppFacadeImpl(db,presentator, chatserver);
};

export const controllerClientAdapterFactory = (httpclient: HttpClient,presentator: IChatAppFacadePresenterOutput) => {
    return new ChatControllerWsHttpClientAdapterImpl(httpclient,presentator);
};

export const controllerMomoryFactory = (interactor: IChatAppFacadeControllerInput) => {
    return new ChatControllerMemoryImpl(interactor);
};
