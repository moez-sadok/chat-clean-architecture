import {
  SEND_MESSAGE_USECASE,
  sendMessageFeatureFactory,
  sendMessageAPIControllerAdapter,
  SEND_MESSAGE_HTTP_CONTROLLER,
  SEND_MESSAGE_PRESENTER_API,
  SendMessagePresenterApi
} from '@cca/core-features';
import { Module } from '@nestjs/common';
import { ChatMainConfigProvidersModule, CHAT_DB_MAPPER_PROVIDER, CHAT_SERVER_PROVIDER_PORT, CHAT_NOTIFIER_PROVIDER } from '../../main/chat.main.config.providers.module';
import { SendMessageHttpApiEndPoint } from './send-message.api.http.endpoints';

@Module({
  imports: [ChatMainConfigProvidersModule],
  providers: [
    //  usecase
    { provide: SEND_MESSAGE_PRESENTER_API, useValue: new SendMessagePresenterApi() },
    {
      provide: SEND_MESSAGE_USECASE, useFactory: sendMessageFeatureFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER, SEND_MESSAGE_PRESENTER_API, CHAT_SERVER_PROVIDER_PORT, CHAT_NOTIFIER_PROVIDER]
    },
    { // api controller adapter
      provide: SEND_MESSAGE_HTTP_CONTROLLER, useFactory: sendMessageAPIControllerAdapter,
      inject: [SEND_MESSAGE_USECASE]
    }
  ],
  controllers: [
    SendMessageHttpApiEndPoint,
  ],
  exports: [
    //api & spa
    SEND_MESSAGE_USECASE,
    SEND_MESSAGE_PRESENTER_API,
    SEND_MESSAGE_HTTP_CONTROLLER
  ]
})
export class SendMessageMainProvidersModule { }
