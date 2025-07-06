import {
  GET_MESSAGES_ByRoomPresenterApi, GET_MESSAGES_ByRoomFeature,
  GET_MESSAGES_ByRoomApiServerControllerAdapter,
  GetMessagesByRoomPresenterApi, getMessagesByRoomFeatureFactory,
  getMessagesByRoomAPIControllerAdapter
} from '@cca/core-features';
import { Module } from '@nestjs/common';
import { ChatMainConfigProvidersModule, CHAT_DB_MAPPER_PROVIDER } from '../../main/chat.main.config.providers.module';
import { GetRoomMessagesHttpApiEndPoint } from './get-messages-by-room.api.http.endpoints';

@Module({
  imports: [ChatMainConfigProvidersModule],
  providers: [
    // api presenter
    { provide: GET_MESSAGES_ByRoomPresenterApi, useValue: new GetMessagesByRoomPresenterApi() },
    { // api usecase (spa)
      provide: GET_MESSAGES_ByRoomFeature, useFactory: getMessagesByRoomFeatureFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER,GET_MESSAGES_ByRoomPresenterApi]
    },
    { // api controller adapter
      provide: GET_MESSAGES_ByRoomApiServerControllerAdapter, useFactory: getMessagesByRoomAPIControllerAdapter,
      inject: [GET_MESSAGES_ByRoomFeature, GET_MESSAGES_ByRoomPresenterApi]
    }
  ],
  controllers: [
    GetRoomMessagesHttpApiEndPoint,
  ],
  exports: [
    //api & spa
    GET_MESSAGES_ByRoomFeature,
    GET_MESSAGES_ByRoomPresenterApi,
    GET_MESSAGES_ByRoomApiServerControllerAdapter
  ]
})
export class GetMessagesByRoomMainProvidersModule { }
