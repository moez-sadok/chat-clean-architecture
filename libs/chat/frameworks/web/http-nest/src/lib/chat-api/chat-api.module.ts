import { Module } from '@nestjs/common';
import { ChatMainConfigProvidersModule } from './main/chat.main.config.providers.module';
import { ChatHttpAdapterController } from './proxy/controller/chat-http.adapter.controller';
import { ChatWsAdapterController } from './proxy/controller/chat-ws.adapter.controller';

@Module({
  imports: [ChatMainConfigProvidersModule],
  controllers: [ChatHttpAdapterController],
  providers: [ChatWsAdapterController]
})
export class ChatApiModule { }
