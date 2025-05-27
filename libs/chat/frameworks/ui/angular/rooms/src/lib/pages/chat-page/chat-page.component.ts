import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { UserWebViewClientImpl } from '@cca/core-views';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, of, tap } from 'rxjs';
import { InjectionToken } from "@angular/core";
import { ChatControllerHttpClientAdapterImpl, ChatControllerWsClientAdapterImpl, IChatHttpController, IChatWsController } from "@cca/core-controllers";
import { ChatUiPresenterImpl, IChatView, IChatAppFacadePresenterOutput, ChatDataViewModelDto } from "@cca/core-presenters";
import { CommonModule } from '@angular/common';
// import { RoomViewModel } from '@cca/core-features';
import { GetUserRoomsComponent } from '../../components/get-user-rooms/get-user-rooms.component';

export const CHAT_PRESENTATOR_PROVIDER = new InjectionToken<IChatAppFacadePresenterOutput>('chat.presentator');
export const CHAT_VIEW_PROVIDER = new InjectionToken<IChatView>('chat.view');
export const CHAT_CONTROLLER_PROVIDER = new InjectionToken<IChatHttpController>('chat.controller');
export const CHAT_SERVER_CONTROLLER_PROVIDER = new InjectionToken<IChatWsController>('chat.server.controller');

export const presenterFactory = (view: IChatView) => {
  return new ChatUiPresenterImpl(view);
};

// net controller (http/ws)
export const controllerClientAdapterFactory = (presentator: IChatAppFacadePresenterOutput) => {
  return new ChatControllerHttpClientAdapterImpl(presentator);
};

export const controllerClientWsAdapterFactory = (presentator: IChatAppFacadePresenterOutput) => {
  return new ChatControllerWsClientAdapterImpl(presentator);
};

@Component({
  selector: 'cca-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    GetUserRoomsComponent
  ],
  providers: [
    { provide: CHAT_VIEW_PROVIDER, useClass: UserWebViewClientImpl },
    {
      provide: CHAT_PRESENTATOR_PROVIDER, useFactory: presenterFactory,
      deps: [CHAT_VIEW_PROVIDER]
    },
    {
      provide: CHAT_CONTROLLER_PROVIDER,
      useFactory: controllerClientAdapterFactory,
      deps: [CHAT_PRESENTATOR_PROVIDER]
    },
    {
      provide: CHAT_SERVER_CONTROLLER_PROVIDER,
      useFactory: controllerClientWsAdapterFactory,
      deps: [CHAT_PRESENTATOR_PROVIDER]
    }
  ]
})
export class ChatPageComponent {

  public activeUserId = 0;

  constructor(protected route: ActivatedRoute,
    @Inject(CHAT_CONTROLLER_PROVIDER) public chatController: IChatHttpController,
    @Inject(CHAT_SERVER_CONTROLLER_PROVIDER) public wsController: IChatWsController,
    @Inject(CHAT_VIEW_PROVIDER) public chatview: IChatView) { }

  // get user id from url (router param)
  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => { return of(params['userId']); }),
      tap((userId) => {
        if (userId != null || userId != undefined) {
          this.activeUserId = +userId;
          this.chatController.getUserById(+userId);
          this.wsController.connectClient(+userId);
          // this.chatController.getUserRooms(+userId);
        }
      })).subscribe(); //TODO use Angular 16 input by route resolver - don't forget to unsubscribe in ondestroy
  }

}
