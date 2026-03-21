import { ChangeDetectorRef, InjectionToken } from "@angular/core";
import { IHttpController } from "@cca/core-controllers";
import { Router } from "@angular/router";
import { GetRoomMessagesSpaClient } from "./get-room-messages.spa.client";
import { IGetMessagesByRoomView, getMessagesByRoomPresenterUiFactory, getMessagesByRoomAPIClientControllerAdapter, GetMessagesByRoomClientView, IGetMessagesByRoomPresenterOutput, IGetMessagesByRoomReactiveView, GetMessagesByRoomClientReactiveView, MessageViewModel, RoomMessagesViewModel } from "@cca/core-features";
import { ReactiveNgSignalAdapter } from "../../adapters/reactive-ng-signal.adapter";
import { ReactiveRxjsObservableAdapter } from "../../adapters/reactive-ngrx-observable.adapter";

export const GET_MESSAGES_BY_ROOM_VIEW = new InjectionToken<IGetMessagesByRoomView>('GetMessagesByRoomView');
export const GET_MESSAGES_BY_ROOM_REACTIVE_VIEW = new InjectionToken<IGetMessagesByRoomReactiveView>('GetMessagesByRoomReactiveView');

export const GET_MESSAGES_BY_ROOM_PRESENTER = new InjectionToken<IGetMessagesByRoomPresenterOutput>('GetMessagesByRoomPresenter');

export const GET_MESSAGES_ByRoomApiClientControllerAdapter = new InjectionToken<IHttpController>('GET_MESSAGES_ByRoomApiClientControllerAdapter');
export const GET_MESSAGES_BY_ROOM_HTTP_API_CLIENT = new InjectionToken('GetMessagesByRoomHttpApiClient');

export const getMessagesByRoomProviders = [
  // View
  // { provide: GET_MESSAGES_BY_ROOM_VIEW, useClass: GetMessagesByRoomClientView },
  {
    provide: GET_MESSAGES_BY_ROOM_REACTIVE_VIEW,
    useFactory: () => new GetMessagesByRoomClientReactiveView(new ReactiveNgSignalAdapter<RoomMessagesViewModel>())
    //  useFactory: (cdRef: ChangeDetectorRef) => new GetMessagesByRoomClientReactiveView(new ReactiveRxjsObservableAdapter<RoomMessagesViewModel>(cdRef)),
    //  deps: [ChangeDetectorRef]
  },
  {// Presenter
    provide: GET_MESSAGES_BY_ROOM_PRESENTER, useFactory: getMessagesByRoomPresenterUiFactory,
    // deps: [GET_MESSAGES_BY_ROOM_VIEW]
    deps: [GET_MESSAGES_BY_ROOM_REACTIVE_VIEW]
  },
  {// API client controller adapter (to-check)
    provide: GET_MESSAGES_ByRoomApiClientControllerAdapter, useFactory: getMessagesByRoomAPIClientControllerAdapter,
    deps: [GET_MESSAGES_BY_ROOM_PRESENTER]
  },
  {//HTTP_API_CLIENT service
    provide: GET_MESSAGES_BY_ROOM_HTTP_API_CLIENT,
    useFactory: (apiClientControllerAdapter: IHttpController) => {
      return new GetRoomMessagesSpaClient(apiClientControllerAdapter);
    },
    deps: [GET_MESSAGES_ByRoomApiClientControllerAdapter, Router]
  },
]