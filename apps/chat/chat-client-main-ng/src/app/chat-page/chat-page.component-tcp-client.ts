import { Component, Inject, OnInit } from '@angular/core';
import { UserWebViewClientImpl } from '@chat-clean-architecture/chat/adapters/views';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, of, tap } from 'rxjs';
import { InjectionToken } from "@angular/core";
import { ChatControllerWsHttpClientAdapterImpl, IChatController } from "@chat-clean-architecture/chat/adapters/controllers";
import { ChatUiPresenterImpl, IChatView } from "@chat-clean-architecture/chat/adapters/presenters";
import { IChatAppFacadePresenterOutput } from "@chat-clean-architecture/chat/application-business-rules/interactor";

export const CHAT_PRESENTATOR_PROVIDER = new InjectionToken<IChatAppFacadePresenterOutput>('chat.presentator');
export const CHAT_VIEW_PROVIDER = new InjectionToken<IChatView>('chat.view');
export const CHAT_CONTROLLER_PROVIDER = new InjectionToken<IChatController>('chat.controller');

export const presenterFactory = (view: IChatView) => {
    return new ChatUiPresenterImpl(view);
};

// net controller (http/ws)
export const controllerClientAdapterFactory = (presentator: IChatAppFacadePresenterOutput) => {
    return new ChatControllerWsHttpClientAdapterImpl(presentator);
};

@Component({
  selector: 'cca-client-chat-page-tcp',
  templateUrl: 'chat-page.component-tcp-client.html',
  styleUrls: ['./chat-page.component-tcp-client.scss'],
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
    }
  ]
})
export class ChatPageTcpClientComponent implements OnInit {

  public activeUserId = 0;

  constructor(protected route: ActivatedRoute,
    @Inject(CHAT_CONTROLLER_PROVIDER) public chatController: IChatController,
    @Inject(CHAT_VIEW_PROVIDER) public chatview: IChatView) { }

  // get user id from url (router param)
  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => { return of(params['userId']); }),
      tap((userId) => {
        if (userId != null || userId != undefined) {
          this.activeUserId = +userId;
          this.chatController.connectClient(+userId);
          this.chatController.getUserRooms(+userId);
        }
      })).subscribe(); //TODO use Angular 16 input by route resolver - don't forget to unsubscribe in ondestroy
  }
}

