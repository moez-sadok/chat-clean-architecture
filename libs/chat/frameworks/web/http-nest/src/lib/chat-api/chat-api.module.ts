import { Module } from '@nestjs/common';
// import { ChatMainConfigProvidersModule } from './main/chat.main.config.providers.module';
import { ChatHttpAdapterController } from './adapters/controller/chat-http.adapter.controller';
import { ChatMainFeaturesProvidersModule } from './main/chat.main.features.providers.module';

@Module({
  imports: [ChatMainFeaturesProvidersModule],
  controllers: [ChatHttpAdapterController],
  // providers: [ChatWsAdapterController]
})
export class ChatApiModule { }
