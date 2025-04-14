import { InjectionToken } from "@angular/core";
import { IChatAppFacadePresenterOutput, IChatView, ChatUiPresenterImpl } from "@cca/core-presenters";
import { IChatDatabase, DataBaseMapper, IChatRepository } from "@cca/core-repositories";
import { IChatHttpController, IChatWsController } from "@cca/core-controllers";
import { IChatServerPort } from "@cca/core-gateways";

export const CHAT_PRESENTATOR_PROVIDER = new InjectionToken<IChatAppFacadePresenterOutput>('chat.presentator');
export const CHAT_VIEW_PROVIDER = new InjectionToken<IChatView>('chat.view');
export const CHAT_CONTROLLER_PROVIDER = new InjectionToken<IChatHttpController>('chat.controller');
export const CHAT_DB_PROVIDER = new InjectionToken<IChatDatabase>('chat.bd');
export const CHAT_SERVER_PROVIDER_PORT = new InjectionToken<IChatServerPort>('chat.server.port.facade');
// export const CHAT_INTERACTOR_PROVIDER = new InjectionToken<IChatAppFacadeControllerInput>('chat.interactor');
export const CHAT_DB_MAPPER_PROVIDER = new InjectionToken<IChatRepository>('chat.mapper.bd');
export const CHAT_SERVER_CONTROLLER_PROVIDER = new InjectionToken<IChatWsController>('chat.server.controller');

export const presenterFactory = (view: IChatView) => {
    return new ChatUiPresenterImpl(view);
};

export const dbMapperFactory = (db: IChatDatabase) => {
    return new DataBaseMapper(db);
};
// export const interactorNetworkFactory = (db: IChatRepository, presentator: IChatAppFacadePresenterOutput,chatserver: IChatServerPort) => {
//     return new ChatAppFacadeImpl(db,presentator, chatserver);
// };

// //inmemory controller
// export const controllerMomoryFactory = (interactor: IChatAppFacadeControllerInput) => {
//     return new ChatControllerMemoryImpl(interactor)
// };

// export const controllerClientWsAdapterFactory = (interactor: IChatAppFacadeControllerInput,presentator: IChatAppFacadePresenterOutput) => {
//     return new ChatServerControllerMemoryImpl(interactor,presentator);
// };
  

