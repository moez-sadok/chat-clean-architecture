import { InjectionToken } from "@angular/core";
import { ChatControllerMemoryImpl, IChatApiController } from "@chat-clean-architecture/chat/adapters/controllers";
import { DataBaseMapper, IChatDatabase } from "@chat-clean-architecture/chat/adapters/gateways";
import { ChatInMemoryPresenterImpl, IChatView } from "@chat-clean-architecture/chat/adapters/presenters";
import { ChatInteractorInMemoryImpl, IChatControllerInputBoundary, IChatPresenterOutputBoundary, IChatServer, IDataAccess } from "@chat-clean-architecture/chat/application-business-rules/interactor";
import { ChatServerImpl  } from "@chat-clean-architecture/chat/adapters/gateways/server-gateway";
import { HttpClient } from "@angular/common/http";
import { ChatControllerWsHttpClientAdapterImpl } from "./chat-controller-ws-http-client-adapter";

export const CHAT_SERVER_PROVIDER = new InjectionToken<IChatServer>('chat.server.facade');
export const CHAT_INTERACTOR_PROVIDER = new InjectionToken<IChatControllerInputBoundary>('chat.interactor');
export const CHAT_DB_PROVIDER = new InjectionToken<IChatDatabase>('chat.bd');
export const CHAT_DB_MAPPER_PROVIDER = new InjectionToken<IDataAccess>('chat.mapper.bd');
export const CHAT_PRESENTATOR_PROVIDER = new InjectionToken<IChatPresenterOutputBoundary>('chat.presentator');
export const CHAT_VIEW_PROVIDER = new InjectionToken<IChatView>('chat.view');
export const CHAT_CONTROLLER_PROVIDER = new InjectionToken<IChatApiController>('chat.controller');

export const dbMapperFactory = (db: IChatDatabase) => {
    return new DataBaseMapper(db);
};

export const presenterFactory = (view: IChatView) => {
    return new ChatInMemoryPresenterImpl(view);
};

export const interactorFactory = (db: IDataAccess, presentator: IChatPresenterOutputBoundary,chatserver: IChatServer) => {
    return new ChatInteractorInMemoryImpl(db,presentator, chatserver);
};

export const chatServerFactory = (db: IDataAccess) => {
    return new ChatServerImpl(db);
};

export const controllerClientAdapterFactory = (httpclient: HttpClient,presentator: IChatPresenterOutputBoundary) => {
    return new ChatControllerWsHttpClientAdapterImpl(httpclient,presentator);
};

export const controllerFactory = (interactor: IChatControllerInputBoundary) => {
    return new ChatControllerMemoryImpl(interactor);
};
