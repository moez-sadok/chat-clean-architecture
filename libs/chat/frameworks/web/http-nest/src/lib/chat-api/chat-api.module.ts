import { Module } from '@nestjs/common';
import { ChatMainConfigProvidersModule } from './main/chat.main.config.providers.module';
import { ChatHttpAdapterController } from './adapters/controller/chat-http.adapter.controller';
import { ChatWsAdapterController } from './adapters/controller/chat-ws.adapter.controller';

@Module({
  imports: [ChatMainConfigProvidersModule],
  controllers: [
    ChatHttpAdapterController,
  ],
  providers: [ChatWsAdapterController]
})
export class ChatApiModule {}
