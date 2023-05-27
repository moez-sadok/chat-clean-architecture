import { Module } from '@nestjs/common';
import { DataBaseMemoryImpl } from '@chat-clean-architecture/chat/frameworks/db/in-memory-db';
import { IChatDatabase, DataBaseMapper } from '@chat-clean-architecture/chat/adapters/gateways';
import { IDataAccess, IChatPresenterOutputBoundary, ChatInteractorApiImpl, IChatServerPort } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { ChatApiControllerImpl } from '@chat-clean-architecture/chat/adapters/controllers';
import { IChatControllerInputBoundary } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { ChatServerGatewayAdapter } from '../adapters/gateway/server.ws.gateway.adapter';
import { ChatPresenterWsImpl } from '../adapters/presenter/chat-presenter-ws-http';

export const CHAT_INTERACTOR_PROVIDER = 'CHAT_INTERACTOR_PROVIDER';
export const CHAT_SERVER_PROVIDER = 'CHAT_SERVER_PROVIDER';
export const CHAT_DB_PROVIDER = 'CHAT_DB_PROVIDER';
export const CHAT_DB_MAPPER_PROVIDER = 'CHAT_DB_MAPPER_PROVIDER';
export const CHAT_PRESENTATOR_PROVIDER = 'CHAT_PRESENTATOR_PROVIDER';
export const CHAT_CONTROLLER_PROVIDER = 'CHAT_CONTROLLER_PROVIDER';

export const dbMapperFactory = (db: IChatDatabase) => {
  return new DataBaseMapper(db);
};

export const interactorFactory = (db: IDataAccess, presenter: IChatPresenterOutputBoundary) => {
  return new ChatInteractorApiImpl(db, presenter);

};

export const controllerFactory = (interactor: IChatControllerInputBoundary) => {
  return new ChatApiControllerImpl(interactor);
};

export const presenterFactory = (server: IChatServerPort) => {
  return new ChatPresenterWsImpl(server);

};

@Module({
  providers: [
    ChatServerGatewayAdapter,
    //{ provide: CHAT_SERVER_PROVIDER, useValue: new ChatServerGatewayAdapter() },
    { provide: CHAT_DB_PROVIDER, useValue: new DataBaseMemoryImpl() },
    {
      provide: CHAT_PRESENTATOR_PROVIDER, useFactory: presenterFactory,
      inject: [ChatServerGatewayAdapter]
    },
    {
      provide: CHAT_DB_MAPPER_PROVIDER, useFactory: dbMapperFactory,
      inject: [CHAT_DB_PROVIDER]
    },

    {
      provide: CHAT_INTERACTOR_PROVIDER, useFactory: interactorFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER, CHAT_PRESENTATOR_PROVIDER]
    },
    {
      provide: CHAT_CONTROLLER_PROVIDER, useFactory: controllerFactory,
      inject: [CHAT_INTERACTOR_PROVIDER]
    }
  ],
  exports: [
    CHAT_CONTROLLER_PROVIDER,
    CHAT_INTERACTOR_PROVIDER,
    ChatServerGatewayAdapter
  ]
})
export class ChatMainConfigProvidersModule { }
