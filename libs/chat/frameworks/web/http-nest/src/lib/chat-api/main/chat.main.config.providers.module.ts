import { Module } from '@nestjs/common';
import { DataBaseMemoryImpl } from '@chat-clean-architecture/chat/frameworks/db/in-memory-db';
import { IChatDatabase, DataBaseMapper } from '@chat-clean-architecture/chat/adapters/gateways';
import { IDataAccess, IChatPresenterOutputBoundary, IChatServerPort, ChatInteractorImpl } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { ChatApiControllerImpl } from '@chat-clean-architecture/chat/adapters/controllers';
import { ChatApiPresenterImpl } from '@chat-clean-architecture/chat/adapters/presenters';
import { IChatControllerInputBoundary } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { ChatServerNetworkAdapter } from '../adapters/network/server.ws.network.adapter';

export const CHAT_INTERACTOR_PROVIDER = 'CHAT_INTERACTOR_PROVIDER';
export const CHAT_DB_PROVIDER = 'CHAT_DB_PROVIDER';
export const CHAT_DB_MAPPER_PROVIDER = 'CHAT_DB_MAPPER_PROVIDER';
export const CHAT_PRESENTATOR_PROVIDER = 'CHAT_PRESENTATOR_PROVIDER';
export const CHAT_CONTROLLER_PROVIDER = 'CHAT_CONTROLLER_PROVIDER';
//export const CHAT_SERVER_PROVIDER_PORT = 'CHAT_SERVER_PROVIDER_PORT';

export const dbMapperFactory = (db: IChatDatabase) => {
  return new DataBaseMapper(db);
};

export const interactorNetworkFactory = (db: IDataAccess, presenter: IChatPresenterOutputBoundary, chatserver: IChatServerPort) => {
  return new ChatInteractorImpl(db, presenter, chatserver);
};

export const controllerFactory = (interactor: IChatControllerInputBoundary) => {
  return new ChatApiControllerImpl(interactor);
};

@Module({
  providers: [
    ChatServerNetworkAdapter,//{ provide: CHAT_SERVER_PROVIDER_PORT, useValue: new ChatServerNetworkAdapter() },
    
    { provide: CHAT_DB_PROVIDER, useValue: new DataBaseMemoryImpl() },
    { provide: CHAT_PRESENTATOR_PROVIDER, useValue: new ChatApiPresenterImpl() },
    {
      provide: CHAT_DB_MAPPER_PROVIDER, useFactory: dbMapperFactory,
      inject: [CHAT_DB_PROVIDER]
    },
    {
      provide: CHAT_INTERACTOR_PROVIDER, useFactory: interactorNetworkFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER, CHAT_PRESENTATOR_PROVIDER, ChatServerNetworkAdapter]
    },
    {
      provide: CHAT_CONTROLLER_PROVIDER, useFactory: controllerFactory,
      inject: [CHAT_INTERACTOR_PROVIDER]
    }
  ],
  exports: [
    CHAT_CONTROLLER_PROVIDER,
    CHAT_INTERACTOR_PROVIDER,
    ChatServerNetworkAdapter
  ]
})
export class ChatMainConfigProvidersModule { }
