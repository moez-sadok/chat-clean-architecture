import {
  GET_USER_ByIdFeature,
  GetUserByIdPresenterAPI,
  getUserByIdFeatureFactory,
  getUserByIdAPIControllerAdapter,
  GET_USER_ByIdApiServerControllerAdapter,
  GET_USER_ByIdPresenterApi
} from '@cca/core-features';
import { Module } from '@nestjs/common';
import { ChatMainConfigProvidersModule, CHAT_DB_MAPPER_PROVIDER } from '../../main/chat.main.config.providers.module';
import { GetUserByIdHttpApiEndPoint } from './get-user-by-id.api.http.endpoints';

@Module({
  imports: [ChatMainConfigProvidersModule],
  providers: [
    // get user by id usecase
    { provide: GET_USER_ByIdPresenterApi, useValue: new GetUserByIdPresenterAPI() },
    {
      provide: GET_USER_ByIdFeature, useFactory: getUserByIdFeatureFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER, GET_USER_ByIdPresenterApi]
    },
    { // api controller adapter
      provide: GET_USER_ByIdApiServerControllerAdapter, useFactory: getUserByIdAPIControllerAdapter,
      inject: [GET_USER_ByIdFeature, GET_USER_ByIdPresenterApi]
    }
  ],
  controllers: [
    GetUserByIdHttpApiEndPoint,
  ],
  exports: [
    //api & spa
    GET_USER_ByIdFeature,
    GET_USER_ByIdPresenterApi,
    GET_USER_ByIdApiServerControllerAdapter
  ]
})
export class GetUserByIdMainProvidersModule { }
