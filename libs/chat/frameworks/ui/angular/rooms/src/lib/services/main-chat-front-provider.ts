import { InjectionToken } from "@angular/core";
import { ChatControllerImpl, IChatController } from "@chat-clean-architecture/chat/adapters/controllers";
import { DataBaseMapper, IChatDatabase } from "@chat-clean-architecture/chat/adapters/gateways";
import { ChatWebPresenterImpl, IChatWebViewScreen } from "@chat-clean-architecture/chat/adapters/presenters";
import { ChatInteractorImpl, IChatControllerInputBoundary, IChatPresenterOutputBoundary, IChatServer, IDataAccess } from "@chat-clean-architecture/chat/application-business-rules/interactor";
import { ChatServerImpl  } from "@chat-clean-architecture/chat/adapters/gateways/server-gateway";

export const CHAT_SERVER_PROVIDER = new InjectionToken<IChatServer>('chat.server.facade');
export const CHAT_INTERACTOR_PROVIDER = new InjectionToken<IChatControllerInputBoundary>('chat.interactor');
export const CHAT_DB_PROVIDER = new InjectionToken<IChatDatabase>('chat.bd');
export const CHAT_DB_MAPPER_PROVIDER = new InjectionToken<IDataAccess>('chat.mapper.bd');
export const CHAT_PRESENTATOR_PROVIDER = new InjectionToken<IChatPresenterOutputBoundary>('chat.presentator');
export const CHAT_VIEW_PROVIDER = new InjectionToken<IChatWebViewScreen>('chat.view');
export const CHAT_CONTROLLER_PROVIDER = new InjectionToken<IChatController>('chat.controller');

export const dbMapperFactory = (db: IChatDatabase) => {
    return new DataBaseMapper(db);
};

export const presenterFactory = (view: IChatWebViewScreen) => {
    return new ChatWebPresenterImpl(view);
};

export const interactorFactory = (db: IDataAccess, presentator: IChatPresenterOutputBoundary,chatserver: IChatServer) => {
    return new ChatInteractorImpl(db,presentator, chatserver);
};

export const chatServerFactory = (db: IDataAccess) => {
    return new ChatServerImpl(db);
};

export const controllerFactory = (interactor: IChatControllerInputBoundary) => {
    return new ChatControllerImpl(interactor);
};

// export const interactorFactory = (db: IDataAccess, presentator: IChatPresenterOutputBoundary) => {
//     return new ChatInteractorImpl(db, presentator);
// };

// export const chatAppMainFactory = (view: IChatWebViewScreen, constroller: IChatController) => {
//     return new ChatAppMain(view, constroller);
// };

//import {  IChatAppMainFacade } from "@chat-clean-architecture/chat/application-business-rules/main";
//export const CHAT_MAIN_FACADE_PROVIDER = new InjectionToken<IChatAppMainFacade>('chat.main.facade');
