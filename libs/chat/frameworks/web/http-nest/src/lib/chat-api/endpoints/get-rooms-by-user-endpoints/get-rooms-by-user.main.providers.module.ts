import { Module } from '@nestjs/common';
import {
  GET_ROOMS_BY_USER_HTTP_CONTROLLER, GET_ROOMS_BY_USER_USECASE, GET_ROOMS_BY_USER_PRESENTER_API,
  getRoomsByUserFeatureFactory, GetRoomsByUserPresenterAPI, getRoomsByUserAPIControllerAdapter,
  GET_ROOMS_BY_USER_SSR_CONTROLLER,
  getRoomsByUserSSRControllerAdapter,
  GetRoomsByUserSSRView,
  GET_ROOMS_BY_USER_SSR_VIEW,
  GET_ROOMS_BY_USER_SSR_PRESENTER,
  getRoomsByUserPresenterSSRFactory,
  GET_ROOMS_BY_USER_SSR_USECASE
} from '@cca/core-features';
import { CHAT_DB_MAPPER_PROVIDER, ChatMainConfigProvidersModule } from '../../main/chat.main.config.providers.module';
import { GetUserRoomsHttpApiEndPoint } from './get-user-rooms.api.http.endpoints';
import { GetUserRoomsSSREndPoint } from './get-user-rooms.ssr.http.endpoints';

@Module({
  imports: [ChatMainConfigProvidersModule],
  providers: [
    // api presenter
    { provide: GET_ROOMS_BY_USER_PRESENTER_API, useValue: new GetRoomsByUserPresenterAPI() },
    { // api usecase (spa)
      provide: GET_ROOMS_BY_USER_USECASE, useFactory: getRoomsByUserFeatureFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER, GET_ROOMS_BY_USER_PRESENTER_API]
    },
    { // api controller adapter
      provide: GET_ROOMS_BY_USER_HTTP_CONTROLLER, useFactory: getRoomsByUserAPIControllerAdapter,
      inject: [GET_ROOMS_BY_USER_USECASE]
    },
    
    // ssr view 
    { provide: GET_ROOMS_BY_USER_SSR_VIEW, useValue: new GetRoomsByUserSSRView() },
    { //ssr presenter
      provide: GET_ROOMS_BY_USER_SSR_PRESENTER, useFactory: getRoomsByUserPresenterSSRFactory,
      inject: [GET_ROOMS_BY_USER_SSR_VIEW]
    },
    { //ssr usecase
      provide: GET_ROOMS_BY_USER_SSR_USECASE, useFactory: getRoomsByUserFeatureFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER, GET_ROOMS_BY_USER_SSR_PRESENTER]
    },
    { //ssr controller adapter
      provide: GET_ROOMS_BY_USER_SSR_CONTROLLER, useFactory: getRoomsByUserSSRControllerAdapter,
      inject: [GET_ROOMS_BY_USER_SSR_USECASE, GET_ROOMS_BY_USER_SSR_PRESENTER, GET_ROOMS_BY_USER_SSR_VIEW]
    },

  ],
  controllers: [
    GetUserRoomsHttpApiEndPoint,
    GetUserRoomsSSREndPoint
  ],
  exports: [
    //api & spa
    GET_ROOMS_BY_USER_USECASE,
    GET_ROOMS_BY_USER_PRESENTER_API,
    GET_ROOMS_BY_USER_HTTP_CONTROLLER,
    //ssr
    GET_ROOMS_BY_USER_SSR_USECASE,
    GET_ROOMS_BY_USER_SSR_PRESENTER,
    GET_ROOMS_BY_USER_SSR_CONTROLLER,
    GET_ROOMS_BY_USER_SSR_VIEW
  ]
})
export class GetRoomsByUserMainProvidersModule { }
