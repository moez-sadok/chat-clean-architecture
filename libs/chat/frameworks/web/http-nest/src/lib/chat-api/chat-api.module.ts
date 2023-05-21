import { Module } from '@nestjs/common';
import { ChatMainApiImpl } from './main/chat-main-api-impl';
import { ChatHttpApiadApterController } from './controller-adapters/chat-http-api.controller';
import { ChatSocketApiadApterController } from './controller-adapters/chat-socket.api.controller';

@Module({
  //imports: [ChatProvidersModule], // to complete replace the config app main by di
  controllers: [
    ChatHttpApiadApterController
  ],
  providers: [
    ChatMainApiImpl,
    ChatSocketApiadApterController
  ]
})
export class ChatApiModule {}
