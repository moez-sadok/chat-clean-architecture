import { Module } from '@nestjs/common';
import { DataBaseMemoryImpl } from '@chat-clean-architecture/chat/frameworks/db/in-memory-db';
import { IChatDatabase, DataBaseMapper } from '@cca/core-repositories';
import { ChatServerWSAdapter } from '../adapters/controller/chat-server.ws-adapter';

export const CHAT_DB_PROVIDER = 'CHAT_DB_PROVIDER';
export const CHAT_DB_MAPPER_PROVIDER = 'CHAT_DB_MAPPER_PROVIDER';
export const CHAT_PRESENTATOR_PROVIDER = 'CHAT_PRESENTATOR_PROVIDER';
export const CHAT_SERVER_PROVIDER_PORT = 'CHAT_SERVER_PROVIDER_PORT';

export const dbMapperFactory = (db: IChatDatabase) => {
  return new DataBaseMapper(db);
};

@Module({
  providers: [
    { provide: CHAT_DB_PROVIDER, useValue: new DataBaseMemoryImpl() },
    {
      provide: CHAT_DB_MAPPER_PROVIDER, useFactory: dbMapperFactory,
      inject: [CHAT_DB_PROVIDER]
    },
    { provide: CHAT_SERVER_PROVIDER_PORT, useClass: ChatServerWSAdapter },
  ],
  exports: [
    CHAT_DB_MAPPER_PROVIDER, 
    CHAT_DB_PROVIDER, 
    CHAT_SERVER_PROVIDER_PORT
  ]
})
export class ChatMainConfigProvidersModule { }
