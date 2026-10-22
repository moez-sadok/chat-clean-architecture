import {
  GET_USER_BY_ID_USECASE,
  GetUserByIdPresenterAPI,
  getUserByIdFeatureFactory,
  getUserByIdAPIControllerAdapter,
  GET_USER_BY_ID_HTTP_CONTROLLER,
  GET_USER_BY_ID_PRESENTER_API
} from '@cca/core-features';
import { Module } from '@nestjs/common';
import { ChatMainConfigProvidersModule, CHAT_DB_MAPPER_PROVIDER } from '../../main/chat.main.config.providers.module';
import { GetUserByIdHttpApiEndPoint } from './get-user-by-id.api.http.endpoints';

@Module({
  imports: [ChatMainConfigProvidersModule],
  providers: [
    // get user by id usecase
    { provide: GET_USER_BY_ID_PRESENTER_API, useValue: new GetUserByIdPresenterAPI() },
    {
      provide: GET_USER_BY_ID_USECASE, useFactory: getUserByIdFeatureFactory,
      inject: [CHAT_DB_MAPPER_PROVIDER, GET_USER_BY_ID_PRESENTER_API]
    },
    { // api controller adapter
      provide: GET_USER_BY_ID_HTTP_CONTROLLER, useFactory: getUserByIdAPIControllerAdapter,
      inject: [GET_USER_BY_ID_USECASE]
    }
  ],
  controllers: [
    GetUserByIdHttpApiEndPoint,
  ],
  exports: [
    //api & spa
    GET_USER_BY_ID_USECASE,
    GET_USER_BY_ID_PRESENTER_API,
    GET_USER_BY_ID_HTTP_CONTROLLER
  ]
})
export class GetUserByIdMainProvidersModule { }
