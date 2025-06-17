import { Module } from '@nestjs/common';
import { ChatHttpAdapterController } from './adapters/controller/chat-http.adapter.controller';
import { ChatMainFeaturesFacadeProvidersModule } from './main/chat.main.features.providers.module';
import { GetRoomsByUserMainProvidersModule } from './get-rooms-by-user-endpoints/get-rooms-by-user.main.providers.module';
import { GetMessagesByRoomMainProvidersModule } from './get-messages-by-room-endpoints/get-messages-by-room.main.providers.module';

@Module({
  imports: [
    ChatMainFeaturesFacadeProvidersModule,
    GetRoomsByUserMainProvidersModule,
    GetMessagesByRoomMainProvidersModule
  ],
  controllers: [
    ChatHttpAdapterController
  ],
  // providers: [ChatWsAdapterController]
})
export class ChatApiModule { }
