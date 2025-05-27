import { Module } from '@nestjs/common';
import {
  GET_MESSAGES_ByRoomFeature, GET_MESSAGES_ByRoomPresenter,
  GET_ROOMS_ByUserFeature,
  GET_ROOMS_ByUserPresenter, GET_USER_ByIdFeature,
  GET_USER_ByIdPresenter, getMessagesByRoomFeatureFactory,
  getRoomsByUserFeatureFactory, GetRoomsByUserPresenterAPI, getUserByIdFeatureFactory,
  SEND_MESSAGE_Feature, SEND_MESSAGE_Presenter,
  sendMessageFeatureFactory
} from '@cca/core-features';
import { GetMessagesByRoomPresenterApi, GetUserByIdPresenterAPI, SendMessagePresenterApi } from '@cca/core-presenters';
import { CHAT_DB_MAPPER_PROVIDER, CHAT_SERVER_PROVIDER_PORT, ChatMainConfigProvidersModule } from './chat.main.config.providers.module';

@Module({
  imports: [ChatMainConfigProvidersModule],
  providers: [
    // get rooms by user feature
    { provide: GET_USER_ByIdPresenter, useValue: new GetUserByIdPresenterAPI() },
    {
      provide: GET_USER_ByIdFeature, useFactory: getUserByIdFeatureFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER, GET_USER_ByIdPresenter]
    },
    // get rooms by user feature
    { provide: GET_ROOMS_ByUserPresenter, useValue: new GetRoomsByUserPresenterAPI() },
    {
      provide: GET_ROOMS_ByUserFeature, useFactory: getRoomsByUserFeatureFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER]
    },
    // get messages by room
    { provide: GET_MESSAGES_ByRoomPresenter, useValue: new GetMessagesByRoomPresenterApi() },
    {
      provide: GET_MESSAGES_ByRoomFeature, useFactory: getMessagesByRoomFeatureFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER, GET_MESSAGES_ByRoomPresenter]
    },
    // send message feature
    { provide: SEND_MESSAGE_Presenter, useValue: new SendMessagePresenterApi() },
    {
      provide: SEND_MESSAGE_Feature, useFactory: sendMessageFeatureFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER, SEND_MESSAGE_Presenter, CHAT_SERVER_PROVIDER_PORT]
    }
  ],
  exports: [
    GET_USER_ByIdFeature,
    GET_ROOMS_ByUserFeature,
    GET_MESSAGES_ByRoomFeature,
    SEND_MESSAGE_Feature,
    //
    GET_ROOMS_ByUserPresenter
  ]
})
export class ChatMainFeaturesProvidersModule { }
