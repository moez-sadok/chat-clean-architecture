import { InjectionToken } from "@angular/core";
import { ChatControllerMemoryImpl, IChatController } from "@chat-clean-architecture/chat/adapters/controllers";
import { DataBaseMapper, IChatDatabase } from "@chat-clean-architecture/chat/adapters/gateways";
import { ChatInMemoryPresenterImpl, IChatView } from "@chat-clean-architecture/chat/adapters/presenters";
import { ChatInteractorInMemoryImpl, IChatControllerInputBoundary, IChatPresenterOutputBoundary, IChatServer, IDataAccess } from "@chat-clean-architecture/chat/application-business-rules/interactor";
import { ChatServerImpl  } from "@chat-clean-architecture/chat/adapters/gateways/server-gateway";
import { ChatInteractorWsHttpClientFacadeImpl } from "./chat-interactor-ws-http-client-facade";
import { HttpClient } from "@angular/common/http";

export const CHAT_SERVER_PROVIDER = new InjectionToken<IChatServer>('chat.server.facade');
export const CHAT_INTERACTOR_PROVIDER = new InjectionToken<IChatControllerInputBoundary>('chat.interactor');
export const CHAT_DB_PROVIDER = new InjectionToken<IChatDatabase>('chat.bd');
export const CHAT_DB_MAPPER_PROVIDER = new InjectionToken<IDataAccess>('chat.mapper.bd');
export const CHAT_PRESENTATOR_PROVIDER = new InjectionToken<IChatPresenterOutputBoundary>('chat.presentator');
export const CHAT_VIEW_PROVIDER = new InjectionToken<IChatView>('chat.view');
export const CHAT_CONTROLLER_PROVIDER = new InjectionToken<IChatController>('chat.controller');

export const dbMapperFactory = (db: IChatDatabase) => {
    return new DataBaseMapper(db);
};

export const presenterFactory = (view: IChatView) => {
    return new ChatInMemoryPresenterImpl(view);
};

export const interactorFactory = (db: IDataAccess, presentator: IChatPresenterOutputBoundary,chatserver: IChatServer) => {
    return new ChatInteractorInMemoryImpl(db,presentator, chatserver);
};

// ws/http interactor // 
export const interactorClientFacadeFactory = (httpclient: HttpClient,presentator: IChatPresenterOutputBoundary) => {
    return new ChatInteractorWsHttpClientFacadeImpl(httpclient,presentator);
};

export const chatServerFactory = (db: IDataAccess) => {
    return new ChatServerImpl(db);
};

export const controllerFactory = (interactor: IChatControllerInputBoundary) => {
    return new ChatControllerMemoryImpl(interactor);
};

// Using an app main facade for the http/ws 
// export const interactorFactory = (db: IDataAccess, presentator: IChatPresenterOutputBoundary) => {
//     return new ChatInteractorImpl(db, presentator);
// };
// export const chatAppMainFactory = (view: IChatView, constroller: IChatController) => {
//     return new ChatAppMain(view, constroller);
// };
//export const CHAT_MAIN_FACADE_PROVIDER = new InjectionToken<IChatAppMainMemoryFacade>('chat.main.facade');
