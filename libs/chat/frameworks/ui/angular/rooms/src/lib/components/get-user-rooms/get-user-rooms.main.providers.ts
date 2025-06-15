import { InjectionToken } from "@angular/core";
import { IHttpController } from "@cca/core-controllers";
import { GetRoomsByUserClientView, getRoomsByUserPresenterUiFactory, IGetRoomsByUserView, IGetRoomsByUserPresenter, getRoomsByUserAPIClientControllerAdapter } from "@cca/core-features";
import { GetUserRoomsHttpApiClient } from "./get-user-rooms.http.api.client";

export const GET_ROOMS_BY_USER_VIEW = new InjectionToken<IGetRoomsByUserView>('GetRoomsByUserView');
export const GET_ROOMS_BY_USER_PRESENTER = new InjectionToken<IGetRoomsByUserPresenter>('GetRoomsByUserPresenter');

export const GET_ROOMS_ByUserApiClientControllerAdapter = new InjectionToken<IHttpController>('GET_ROOMS_ByUserApiClientControllerAdapter');
export const GET_ROOMS_BY_USER_HTTP_API_CLIENT = new InjectionToken('GetRoomsByUserHttpApiClient');

export const getRoomsByUserProviders = [
  // View
  { provide: GET_ROOMS_BY_USER_VIEW, useClass: GetRoomsByUserClientView },
  {// Presenter
    provide: GET_ROOMS_BY_USER_PRESENTER, useFactory: getRoomsByUserPresenterUiFactory,
    deps: [GET_ROOMS_BY_USER_VIEW]
  },
  {// API client controller adapter
    provide: GET_ROOMS_ByUserApiClientControllerAdapter, useFactory: getRoomsByUserAPIClientControllerAdapter,
    deps: [GET_ROOMS_BY_USER_PRESENTER]
  },
  {  //HTTP_API_CLIENT service
    provide: GET_ROOMS_BY_USER_HTTP_API_CLIENT,
    useFactory: (apiClientControllerAdapter: IHttpController) => {
      return new GetUserRoomsHttpApiClient(apiClientControllerAdapter);
    },
    deps: [GET_ROOMS_ByUserApiClientControllerAdapter]
  },
]