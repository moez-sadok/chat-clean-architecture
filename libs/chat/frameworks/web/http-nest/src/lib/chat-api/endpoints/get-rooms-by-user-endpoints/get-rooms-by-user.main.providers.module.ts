import { Module } from '@nestjs/common';
import {
  GET_ROOMS_ByUserApiServerControllerAdapter, GET_ROOMS_ByUserFeature, GET_ROOMS_ByUserPresenterApi,
  getRoomsByUserFeatureFactory, GetRoomsByUserPresenterAPI, getRoomsByUserAPIControllerAdapter,
  GET_ROOMS_ByUserSSRControllerAdapter,
  getRoomsByUserSSRControllerAdapter,
  GetRoomsByUserSSRView,
  GET_ROOMS_ByUserSSRView,
  GET_ROOMS_ByUserSSRPresenter,
  getRoomsByUserPresenterSSRFactory,
  getRoomsByUserSSRFeatureFactory,
  GET_ROOMS_ByUserSSRFeature
} from '@cca/core-features';
import { CHAT_DB_MAPPER_PROVIDER, ChatMainConfigProvidersModule } from '../../main/chat.main.config.providers.module';
import { GetUserRoomsHttpApiEndPoint } from './get-user-rooms.api.http.endpoints';
import { GetUserRoomsSSREndPoint } from './get-user-rooms.ssr.http.endpoints';

@Module({
  imports: [ChatMainConfigProvidersModule],
  providers: [
    // api presenter
    { provide: GET_ROOMS_ByUserPresenterApi, useValue: new GetRoomsByUserPresenterAPI() },
    { // api usecase (spa)
      provide: GET_ROOMS_ByUserFeature, useFactory: getRoomsByUserFeatureFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER]
    },
    { // api controller adapter
      provide: GET_ROOMS_ByUserApiServerControllerAdapter, useFactory: getRoomsByUserAPIControllerAdapter,
      inject: [GET_ROOMS_ByUserFeature, GET_ROOMS_ByUserPresenterApi]
    },
    
    // ssr view 
    { provide: GET_ROOMS_ByUserSSRView, useValue: new GetRoomsByUserSSRView() },
    { //ssr presenter
      provide: GET_ROOMS_ByUserSSRPresenter, useFactory: getRoomsByUserPresenterSSRFactory,
      inject: [GET_ROOMS_ByUserSSRView]
    },
    { //ssr usecase
      provide: GET_ROOMS_ByUserSSRFeature, useFactory: getRoomsByUserSSRFeatureFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER, GET_ROOMS_ByUserSSRPresenter]
    },
    { //ssr controller adapter
      provide: GET_ROOMS_ByUserSSRControllerAdapter, useFactory: getRoomsByUserSSRControllerAdapter,
      inject: [GET_ROOMS_ByUserSSRFeature, GET_ROOMS_ByUserSSRPresenter, GET_ROOMS_ByUserSSRView]
    },

  ],
  controllers: [
    GetUserRoomsHttpApiEndPoint,
    GetUserRoomsSSREndPoint
  ],
  exports: [
    //api & spa
    GET_ROOMS_ByUserFeature,
    GET_ROOMS_ByUserPresenterApi,
    GET_ROOMS_ByUserApiServerControllerAdapter,
    //ssr
    GET_ROOMS_ByUserSSRFeature,
    GET_ROOMS_ByUserSSRPresenter,
    GET_ROOMS_ByUserSSRControllerAdapter,
    GET_ROOMS_ByUserSSRView
  ]
})
export class GetRoomsByUserMainProvidersModule { }
