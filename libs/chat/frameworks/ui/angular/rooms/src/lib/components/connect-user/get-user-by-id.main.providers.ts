import { InjectionToken } from "@angular/core";
import { IHttpController } from "@cca/core-controllers";
import { Router } from "@angular/router";
import { IGetUserByIdView, getUserByIdPresenterUiFactory, getUserByIdAPIClientControllerAdapter, GetUserByIdClientView, IGetUserByIdPresenterOutput, UserOutputData } from "@cca/core-features";
import { GetUserByIdSpaClient } from "./get-user-by-id.spa.client";

export const GET_USER_BY_ID_VIEW = new InjectionToken<IGetUserByIdView>('GetUserByIdView');
export const GET_USER_BY_ID_PRESENTER = new InjectionToken<IGetUserByIdPresenterOutput>('GetUserByIdPresenter');

export const GET_USER_BY_ID_HTTP_CLIENT_CONTROLLER = new InjectionToken<IHttpController<UserOutputData | null, void>>('GET_USER_BY_ID_HTTP_CLIENT_CONTROLLER');
export const GET_USER_BY_ID_HTTP_API_CLIENT = new InjectionToken<GetUserByIdSpaClient>('GetUserByIdHttpApiClient');

export const getUserByIdProviders = [
  // View
  { provide: GET_USER_BY_ID_VIEW, useClass: GetUserByIdClientView },
  {// Presenter
    provide: GET_USER_BY_ID_PRESENTER, useFactory: getUserByIdPresenterUiFactory,
    deps: [GET_USER_BY_ID_VIEW]
  },
  {// API client controller adapter
    provide: GET_USER_BY_ID_HTTP_CLIENT_CONTROLLER, useFactory: getUserByIdAPIClientControllerAdapter,
    deps: [GET_USER_BY_ID_PRESENTER]
  },
  {//HTTP_API_CLIENT service
    provide: GET_USER_BY_ID_HTTP_API_CLIENT,
    useFactory: (apiClientControllerAdapter: IHttpController<UserOutputData | null, void>) => {
      return new GetUserByIdSpaClient(apiClientControllerAdapter);
    },
    deps: [GET_USER_BY_ID_HTTP_CLIENT_CONTROLLER, Router]
  },
]