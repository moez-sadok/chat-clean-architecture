import { InjectionToken } from "@angular/core";
import { GetMessagesByRoomClientReactiveView, getMessagesByRoomPresenterUiFactory, IGetMessagesByRoomPresenterOutput, IGetMessagesByRoomReactiveView, IGetMessagesByRoomView, RoomMessagesViewModel } from "@cca/core-features";
import { ReactiveNgSignalAdapter } from "../adapters/reactive-ng-signal.adapter";
import { ReactiveRxjsObservableAdapter } from "../adapters/reactive-rxjs-observable.adapter";

export const GET_MESSAGES_BY_ROOM_PRESENTER = new InjectionToken<IGetMessagesByRoomPresenterOutput>('GetMessagesByRoomPresenter');

export const GET_MESSAGES_BY_ROOM_VIEW = new InjectionToken<IGetMessagesByRoomView>('GetMessagesByRoomView');
export const GET_MESSAGES_BY_ROOM_REACTIVE_VIEW = new InjectionToken<IGetMessagesByRoomReactiveView>('GetMessagesByRoomReactiveView');

export const getMessagePresenterProviders = [
    {
        provide: GET_MESSAGES_BY_ROOM_VIEW,
        useFactory: () => new GetMessagesByRoomClientReactiveView(new ReactiveNgSignalAdapter<RoomMessagesViewModel>())
    },
    {
        provide: GET_MESSAGES_BY_ROOM_REACTIVE_VIEW,
        // Swap reactive strategy here — one line change:
        //useFactory: () => new GetMessagesByRoomClientReactiveView(new ReactiveNgSignalAdapter<RoomMessagesViewModel>())
        useFactory: () => new GetMessagesByRoomClientReactiveView(new ReactiveRxjsObservableAdapter<RoomMessagesViewModel>()),
    },
    {
        provide: GET_MESSAGES_BY_ROOM_PRESENTER,
        useFactory: getMessagesByRoomPresenterUiFactory,
        deps: [GET_MESSAGES_BY_ROOM_REACTIVE_VIEW]
        // If using the non-reactive view, inject GET_MESSAGES_BY_ROOM_VIEW instead:
        // deps: [GET_MESSAGES_BY_ROOM_VIEW]
    }
]