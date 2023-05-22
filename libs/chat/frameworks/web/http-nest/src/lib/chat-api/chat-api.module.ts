import { Module } from '@nestjs/common';
import { ChatHttpApiadApterController } from './controller-adapters/chat-http-api.controller';
import { ChatSocketApiadApterController } from './controller-adapters/chat-socket.api.controller';
import { ChatMainConfigProvidersModule } from './main/chat.main.config.providers.module';

@Module({
  imports: [ChatMainConfigProvidersModule],
  controllers: [
    ChatHttpApiadApterController
  ],
  providers: [
    ChatSocketApiadApterController
  ]
})
export class ChatApiModule {}
