import { Injectable, InjectionToken, Module } from '@nestjs/common';
import { DataBaseMemoryImpl } from '@chat-clean-architecture/chat/frameworks/db/in-memory-db';
import { IChatDatabase, DataBaseMapper } from '@chat-clean-architecture/chat/adapters/gateways';
import { ChatPresenterApiImpl } from '@chat-clean-architecture/chat/adapters/presenters';
import { IDataAccess, IChatPresenterOutputBoundary, ChatInteractorInMemoryImpl } from '@chat-clean-architecture/chat/application-business-rules/interactor';
import { CHAT_DB_PROVIDER, CHAT_DB_MAPPER_PROVIDER, CHAT_PRESENTATOR_PROVIDER, CHAT_INTERACTOR_PROVIDER } from './providers.refs';

///// TO COMPLEATE - replace the main config ////

export const dbMapperFactory = (db: IChatDatabase) => {
    return new DataBaseMapper(db);
};

// export const interactorFactory = (db: IDataAccess, presentator: IChatPresenterOutputBoundary) => {
//     return new ChatInteractorInMemoryImpl(db,presentator,null);
// };

@Injectable()
export class DataBaseMemoryImplService extends DataBaseMemoryImpl {}

@Injectable()
export class ChatPresenterApiImplService extends ChatPresenterApiImpl {}

@Injectable()
export class ChatInteractorInMemoryImplService extends ChatInteractorInMemoryImpl {}


@Module({
  providers: [
    { provide: CHAT_DB_PROVIDER, useClass: DataBaseMemoryImplService },
    {
      provide: CHAT_DB_MAPPER_PROVIDER, useFactory: dbMapperFactory,
      inject:[DataBaseMemoryImplService]
    },
    {
      provide: CHAT_PRESENTATOR_PROVIDER, useClass: ChatPresenterApiImplService
    },
    // {
    //   provide: CHAT_INTERACTOR_PROVIDER, useFactory: interactorFactory,
    //   inject: [CHAT_DB_MAPPER_PROVIDER,CHAT_PRESENTATOR_PROVIDER]
    // },
    // {
    //   provide: CHAT_SERVER_PROVIDER, useFactory: chatServerFactory,
    //   //deps: [CHAT_DB_MAPPER_PROVIDER]
    // },
  ],
  exports: [
    CHAT_DB_PROVIDER,CHAT_DB_MAPPER_PROVIDER,
    CHAT_PRESENTATOR_PROVIDER,CHAT_INTERACTOR_PROVIDER
  ]
})
export class ChatProvidersModule {}
