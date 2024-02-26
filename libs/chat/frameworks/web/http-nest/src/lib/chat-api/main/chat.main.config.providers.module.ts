import { Module } from '@nestjs/common';
import { DataBaseMemoryImpl } from '@chat-clean-architecture/chat/frameworks/db/in-memory-db';
import { IChatDatabase, DataBaseMapper } from '@chat-clean-architecture/chat/adapters/gateways';
import { IChatRepository, IChatAppFacadePresenterOutput, IChatServerPort, ChatInteractorImpl, ChatServerPortImpl, ChatAppFacadeImpl } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { ChatApiControllerImpl } from '@chat-clean-architecture/chat/adapters/controllers';
import { ChatApiPresenterImpl } from '@chat-clean-architecture/chat/adapters/presenters';
import { IChatAppFacadeControllerInput } from '@chat-clean-architecture/chat/application-business-rules/interactor';

export const CHAT_INTERACTOR_PROVIDER = 'CHAT_INTERACTOR_PROVIDER';
export const CHAT_DB_PROVIDER = 'CHAT_DB_PROVIDER';
export const CHAT_DB_MAPPER_PROVIDER = 'CHAT_DB_MAPPER_PROVIDER';
export const CHAT_PRESENTATOR_PROVIDER = 'CHAT_PRESENTATOR_PROVIDER';
export const CHAT_CONTROLLER_PROVIDER = 'CHAT_CONTROLLER_PROVIDER';
export const CHAT_SERVER_PROVIDER_PORT = 'CHAT_SERVER_PROVIDER_PORT';

export const dbMapperFactory = (db: IChatDatabase) => {
  return new DataBaseMapper(db);
};

export const chatServerFactory = (repository: IChatRepository) => {
  return  new ChatServerPortImpl(repository)
};

export const interactorNetworkFactory = (db: IChatRepository, presenter: IChatAppFacadePresenterOutput, chatserver: IChatServerPort) => {
  //return new ChatInteractorImpl(db, presenter, chatserver);
  return new ChatAppFacadeImpl(db,presenter, chatserver);
};

export const controllerFactory = (interactor: IChatAppFacadeControllerInput) => {
  return new ChatApiControllerImpl(interactor);
};

@Module({
  providers: [
    // { provide: CHAT_SERVER_PROVIDER_PORT, useValue: new ChatServerPortImpl() },
    { provide: CHAT_DB_PROVIDER, useValue: new DataBaseMemoryImpl() },
    { provide: CHAT_PRESENTATOR_PROVIDER, useValue: new ChatApiPresenterImpl() },
    {
      provide: CHAT_DB_MAPPER_PROVIDER, useFactory: dbMapperFactory,
      inject: [CHAT_DB_PROVIDER]
    },
    { provide: CHAT_SERVER_PROVIDER_PORT, useFactory: chatServerFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER] },
    {
      provide: CHAT_INTERACTOR_PROVIDER, useFactory: interactorNetworkFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER, CHAT_PRESENTATOR_PROVIDER, CHAT_SERVER_PROVIDER_PORT]
    },
    {
      provide: CHAT_CONTROLLER_PROVIDER, useFactory: controllerFactory,
      inject: [CHAT_INTERACTOR_PROVIDER]
    }
  ],
  exports: [
    CHAT_CONTROLLER_PROVIDER,
    CHAT_INTERACTOR_PROVIDER
  ]
})
export class ChatMainConfigProvidersModule { }
