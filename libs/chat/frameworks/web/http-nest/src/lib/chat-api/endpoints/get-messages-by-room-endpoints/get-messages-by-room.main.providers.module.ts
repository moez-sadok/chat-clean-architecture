import {
  GET_MESSAGES_BY_ROOM_PRESENTER_API, GET_MESSAGES_BY_ROOM_USECASE,
  GET_MESSAGES_BY_ROOM_HTTP_CONTROLLER,
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
    { provide: GET_MESSAGES_BY_ROOM_PRESENTER_API, useValue: new GetMessagesByRoomPresenterApi() },
    { // api usecase (spa)
      provide: GET_MESSAGES_BY_ROOM_USECASE, useFactory: getMessagesByRoomFeatureFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER,GET_MESSAGES_BY_ROOM_PRESENTER_API]
    },
    { // api controller adapter
      provide: GET_MESSAGES_BY_ROOM_HTTP_CONTROLLER, useFactory: getMessagesByRoomAPIControllerAdapter,
      inject: [GET_MESSAGES_BY_ROOM_USECASE]
    }
  ],
  controllers: [
    GetRoomMessagesHttpApiEndPoint,
  ],
  exports: [
    //api & spa
    GET_MESSAGES_BY_ROOM_USECASE,
    GET_MESSAGES_BY_ROOM_PRESENTER_API,
    GET_MESSAGES_BY_ROOM_HTTP_CONTROLLER
  ]
})
export class GetMessagesByRoomMainProvidersModule { }
