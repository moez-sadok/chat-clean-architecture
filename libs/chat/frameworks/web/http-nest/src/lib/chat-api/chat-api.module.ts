import { Module } from '@nestjs/common';
// import { ChatMainConfigProvidersModule } from './main/chat.main.config.providers.module';
import { ChatHttpAdapterController } from './adapters/controller/chat-http.adapter.controller';
import { ChatMainFeaturesProvidersModule } from './main/chat.main.features.providers.module';
import { GetUserRoomsHttpAdapterController } from './adapters/controller/get-user-rooms.http.adapter.controller';

@Module({
  imports: [ChatMainFeaturesProvidersModule],
  controllers: [
    GetUserRoomsHttpAdapterController,
    ChatHttpAdapterController
  ],
  // providers: [ChatWsAdapterController]
})
export class ChatApiModule { }
