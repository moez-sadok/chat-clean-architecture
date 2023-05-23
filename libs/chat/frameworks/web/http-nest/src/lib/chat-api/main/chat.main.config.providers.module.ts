import { Module } from '@nestjs/common';
import { DataBaseMemoryImpl } from '@chat-clean-architecture/chat/frameworks/db/in-memory-db';
import { IChatDatabase, DataBaseMapper } from '@chat-clean-architecture/chat/adapters/gateways';
import { ChatPresenterApiImpl } from '@chat-clean-architecture/chat/adapters/presenters';
import { IDataAccess, IChatPresenterOutputBoundary, ChatInteractorInMemoryImpl, IChatServer } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { ChatServerImpl } from '@chat-clean-architecture/chat/adapters/gateways/server-gateway';
import { ChatApiControllerImpl } from '@chat-clean-architecture/chat/adapters/controllers';
import { IChatControllerInputBoundary } from '@chat-clean-architecture/chat/application-business-rules/interactor';

export const CHAT_INTERACTOR_PROVIDER = 'CHAT_INTERACTOR_PROVIDER';
export const CHAT_SERVER_PROVIDER = 'CHAT_SERVER_PROVIDER';
export const CHAT_DB_PROVIDER = 'CHAT_DB_PROVIDER';
export const CHAT_DB_MAPPER_PROVIDER = 'CHAT_DB_MAPPER_PROVIDER';
export const CHAT_PRESENTATOR_PROVIDER = 'CHAT_PRESENTATOR_PROVIDER';
export const CHAT_CONTROLLER_PROVIDER = 'CHAT_CONTROLLER_PROVIDER';

export const dbMapperFactory = (db: IChatDatabase) => {
  return new DataBaseMapper(db);
};

export const chatServerFactory = (db: IDataAccess) => {
  return new ChatServerImpl(db);
};

export const interactorFactory = (db: IDataAccess, presenter: IChatPresenterOutputBoundary, chatServer: IChatServer) => {
  return new ChatInteractorInMemoryImpl(db, presenter, chatServer);
};

export const controllerFactory = (interactor: IChatControllerInputBoundary) => {
  return new ChatApiControllerImpl(interactor);
};

@Module({
  providers: [
    { provide: CHAT_DB_PROVIDER, useValue: new DataBaseMemoryImpl() },
    { provide: CHAT_PRESENTATOR_PROVIDER, useValue: new ChatPresenterApiImpl() },
    {
      provide: CHAT_DB_MAPPER_PROVIDER, useFactory: dbMapperFactory,
      inject: [CHAT_DB_PROVIDER] // [{ token: CHAT_DB_PROVIDER, optional: true }] 
    },
    {
      provide: CHAT_SERVER_PROVIDER, useFactory: chatServerFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER]
    },
    {
      provide: CHAT_INTERACTOR_PROVIDER, useFactory: interactorFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER, CHAT_PRESENTATOR_PROVIDER, CHAT_SERVER_PROVIDER]
    },
    {
      provide: CHAT_CONTROLLER_PROVIDER, useFactory: controllerFactory,
      inject: [CHAT_INTERACTOR_PROVIDER]
    }
  ],
  exports: [
    CHAT_CONTROLLER_PROVIDER
  ]
})
export class ChatMainConfigProvidersModule { }
