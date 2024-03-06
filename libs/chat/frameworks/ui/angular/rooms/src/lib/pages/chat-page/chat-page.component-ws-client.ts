import { Component, OnInit } from '@angular/core';
import { CHAT_CONTROLLER_PROVIDER, CHAT_PRESENTATOR_PROVIDER, CHAT_VIEW_PROVIDER, controllerClientAdapterFactory, presenterFactory } from '../../services/main-chat-front-provider';
import { UserWebViewClientImpl } from '@chat-clean-architecture/chat/adapters/views';
import { Params } from '@angular/router';
import { switchMap, of, tap } from 'rxjs';
import { ChatPageBaseComponent } from './chat-page.component.base';

@Component({
  selector: 'cca-chat-page-ws-client',
  templateUrl: './chat-page.component.html',
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
export class ChatPageWsHttpClientComponent extends ChatPageBaseComponent implements OnInit{

  // get user id from url (router param)
  ngOnInit(): void {
    this.route.params.pipe(
        switchMap((params: Params) => { return of(params['userId']); }),
        tap((userId) => { if (userId != null || userId != undefined) this.activeUserId = +userId;
        })).subscribe(); //TODO use Angular 16 input by route resolver - don't forget to unsubscribe in ondestroy
  }
}

