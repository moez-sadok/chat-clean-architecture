import { InjectionToken } from "@angular/core";
import { IHttpController } from "@cca/core-controllers";
import { GetRoomsByUserClientView, getRoomsByUserPresenterUiFactory, IGetRoomsByUserView, IGetRoomsByUserPresenter, getRoomsByUserAPIClientControllerAdapter, GetRoomsByUserResponseData } from "@cca/core-features";
import { GetUserRoomsSpaClient } from "./get-user-rooms.spa.client";
import { Router, ActivatedRoute } from "@angular/router";

export const GET_ROOMS_BY_USER_VIEW = new InjectionToken<IGetRoomsByUserView>('GetRoomsByUserView');
export const GET_ROOMS_BY_USER_PRESENTER = new InjectionToken<IGetRoomsByUserPresenter>('GetRoomsByUserPresenter');

export const GET_ROOMS_BY_USER_HTTP_CLIENT_CONTROLLER = new InjectionToken<IHttpController<GetRoomsByUserResponseData[], void>>('GET_ROOMS_BY_USER_HTTP_CLIENT_CONTROLLER');
export const GET_ROOMS_BY_USER_HTTP_API_CLIENT = new InjectionToken<GetUserRoomsSpaClient>('GetRoomsByUserHttpApiClient');

export const getRoomsByUserProviders = [
  // View
  { provide: GET_ROOMS_BY_USER_VIEW, useClass: GetRoomsByUserClientView },
  {// Presenter
    provide: GET_ROOMS_BY_USER_PRESENTER, useFactory: getRoomsByUserPresenterUiFactory,
    deps: [GET_ROOMS_BY_USER_VIEW]
  },
  {// API client controller adapter
    provide: GET_ROOMS_BY_USER_HTTP_CLIENT_CONTROLLER, useFactory: getRoomsByUserAPIClientControllerAdapter,
    deps: [GET_ROOMS_BY_USER_PRESENTER]
  },
  {//HTTP_API_CLIENT service
    provide: GET_ROOMS_BY_USER_HTTP_API_CLIENT,
    useFactory: (apiClientControllerAdapter: IHttpController<GetRoomsByUserResponseData[], void>, router: Router, route: ActivatedRoute) => {
      return new GetUserRoomsSpaClient(apiClientControllerAdapter, router,route);
    },
    deps: [GET_ROOMS_BY_USER_HTTP_CLIENT_CONTROLLER, Router,ActivatedRoute]
  },
]