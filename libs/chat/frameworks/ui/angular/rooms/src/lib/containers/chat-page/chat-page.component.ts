import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { of, switchMap, tap } from 'rxjs';

import { CHAT_CONTROLLER_PROVIDER, CHAT_DB_MAPPER_PROVIDER, CHAT_INTERACTOR_PROVIDER, CHAT_PRESENTATOR_PROVIDER, CHAT_SERVER_PROVIDER, CHAT_VIEW_PROVIDER, controllerFactory, interactorFactory, presenterFactory } from '../../services/main-chat-front-provider';
import { IChatView } from '@chat-clean-architecture/chat/adapters/presenters';
import { UserWebViewClientImpl } from '@chat-clean-architecture/chat/adapters/views';
import { IChatApiController, IChatController } from '@chat-clean-architecture/chat/adapters/controllers';

@Component({
  selector: 'cca-chat-page',
  templateUrl: './chat-page.component.html',
  providers: [
    { provide: CHAT_VIEW_PROVIDER, useClass: UserWebViewClientImpl   /* UserWebViewClientImpl */ },
    {
      provide: CHAT_PRESENTATOR_PROVIDER, useFactory: presenterFactory,
      deps: [CHAT_VIEW_PROVIDER]
    },
    {
      provide: CHAT_INTERACTOR_PROVIDER,
      useFactory: interactorFactory,
      deps: [CHAT_DB_MAPPER_PROVIDER, CHAT_PRESENTATOR_PROVIDER, CHAT_SERVER_PROVIDER]
    },
    {
      provide: CHAT_CONTROLLER_PROVIDER,
      useFactory: controllerFactory,
      deps: [CHAT_INTERACTOR_PROVIDER]
    }
  ]
})
export class ChatPageComponent implements OnInit {

  private _activeUserId = 0;
  @Input() set activeUserId(value: number) {
    if (value != null || value != undefined) {
      this._activeUserId = value;
      this.chatController.initUserConnection(value);
      this.chatController.getUserRooms(value);
    }
  }
  get activeUserId() { return this._activeUserId }

  constructor(private route: ActivatedRoute,
    //@Inject(CHAT_CONTROLLER_PROVIDER) public chatController: IChatController,
    @Inject(CHAT_CONTROLLER_PROVIDER) public chatController: IChatApiController,
    @Inject(CHAT_VIEW_PROVIDER) public chatview: IChatView){ }

  ngOnInit(): void {
    //get user id from url (router param)
    this.route.params.pipe(
        //change as input in angular 16 (userg resolver)
        switchMap((params: Params) => { return of(params['userId']); }),
        tap((userId) => {
          console.log('id user from router', userId);
          if (userId != null || userId != undefined) this.activeUserId = +userId;
        })).subscribe(); //don't forget to unsubscribe in ondestroy
  }

}

