import { Module } from '@nestjs/common';
import { DataBaseMemoryPerfImpl } from '@cca/frameworks/db/in-memory-db';
import { MongoDataBaseImpl, mongoConfigFromEnv } from '@cca/frameworks/db/mongo-db';
import { IChatDatabase, DataBaseMapper } from '@cca/core-gateways';
import { ChatServerWSAdapter } from '@cca/drivers/socketIo/server';

export const CHAT_DB_PROVIDER = 'CHAT_DB_PROVIDER';
export const CHAT_DB_MAPPER_PROVIDER = 'CHAT_DB_MAPPER_PROVIDER';
export const CHAT_SERVER_PROVIDER_PORT = 'CHAT_SERVER_PROVIDER_PORT';

export const dbMapperFactory = (db: IChatDatabase) => {
  return new DataBaseMapper(db);
};

/**
 * Picks the persistence adapter: MongoDB as soon as MONGO_URL is set, the
 * in-memory store otherwise (local runs and demos).
 * Nothing else in the app changes — both implement IChatDatabase.
 */
export const chatDatabaseFactory = async (): Promise<IChatDatabase> => {
  const db: IChatDatabase = process.env['MONGO_URL']
    ? new MongoDataBaseImpl(mongoConfigFromEnv())
    : new DataBaseMemoryPerfImpl();
  await db.createDb();
  return db;
};

@Module({
  providers: [
    { provide: CHAT_DB_PROVIDER, useFactory: chatDatabaseFactory },
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
