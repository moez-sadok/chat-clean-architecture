import {
  SEND_MESSAGE_Feature,
  sendMessageFeatureFactory,
  sendMessageAPIControllerAdapter,
  SEND_MESSAGEApiServerControllerAdapter,
  SEND_MESSAGE_PresenterApi,
  SendMessagePresenterApi
} from '@cca/core-features';
import { Module } from '@nestjs/common';
import { ChatMainConfigProvidersModule, CHAT_DB_MAPPER_PROVIDER, CHAT_SERVER_PROVIDER_PORT } from '../../main/chat.main.config.providers.module';
import { SendMessageHttpApiEndPoint } from './send-message.api.http.endpoints';

@Module({
  imports: [ChatMainConfigProvidersModule],
  providers: [
    //  usecase
    { provide: SEND_MESSAGE_PresenterApi, useValue: new SendMessagePresenterApi() },
    {
      provide: SEND_MESSAGE_Feature, useFactory: sendMessageFeatureFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER, SEND_MESSAGE_PresenterApi,CHAT_SERVER_PROVIDER_PORT ]
    },
    { // api controller adapter
      provide: SEND_MESSAGEApiServerControllerAdapter, useFactory: sendMessageAPIControllerAdapter,
      inject: [SEND_MESSAGE_Feature, SEND_MESSAGE_PresenterApi]
    }
  ],
  controllers: [
    SendMessageHttpApiEndPoint,
  ],
  exports: [
    //api & spa
    SEND_MESSAGE_Feature,
    SEND_MESSAGE_PresenterApi,
    SEND_MESSAGEApiServerControllerAdapter
  ]
})
export class SendMessageMainProvidersModule { }
