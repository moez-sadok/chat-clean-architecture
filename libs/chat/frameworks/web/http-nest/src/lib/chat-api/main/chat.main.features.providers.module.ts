import { Module } from '@nestjs/common';
import {
  GET_USER_ByIdFeature,
  GET_USER_ByIdPresenter,
  getUserByIdFeatureFactory,SEND_MESSAGE_Feature,
  SEND_MESSAGE_Presenter,sendMessageFeatureFactory
} from '@cca/core-features';
import { GetUserByIdPresenterAPI, SendMessagePresenterApi } from '@cca/core-presenters';
import { CHAT_DB_MAPPER_PROVIDER, CHAT_SERVER_PROVIDER_PORT, ChatMainConfigProvidersModule } from './chat.main.config.providers.module';

@Module({
  imports: [ChatMainConfigProvidersModule],
  providers: [
    // get user by id usecase
    { provide: GET_USER_ByIdPresenter, useValue: new GetUserByIdPresenterAPI() },
    {
      provide: GET_USER_ByIdFeature, useFactory: getUserByIdFeatureFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER, GET_USER_ByIdPresenter]
    },
    // send message usecase
    { provide: SEND_MESSAGE_Presenter, useValue: new SendMessagePresenterApi() },
    {
      provide: SEND_MESSAGE_Feature, useFactory: sendMessageFeatureFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER, SEND_MESSAGE_Presenter, CHAT_SERVER_PROVIDER_PORT]
    },
  ],
  exports: [
    GET_USER_ByIdFeature,
    SEND_MESSAGE_Feature,
  ]
})
export class ChatMainFeaturesFacadeProvidersModule { }
