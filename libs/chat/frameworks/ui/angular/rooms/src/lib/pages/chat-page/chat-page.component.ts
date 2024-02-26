import { Component, Inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CHAT_CONTROLLER_PROVIDER, CHAT_DB_MAPPER_PROVIDER, CHAT_INTERACTOR_PROVIDER, CHAT_PRESENTATOR_PROVIDER, CHAT_SERVER_PROVIDER_PORT, CHAT_VIEW_PROVIDER, controllerFactory, interactorNetworkFactory, presenterFactory } from '../../services/main-chat-front-provider';
import { IChatView } from '@chat-clean-architecture/chat/adapters/presenters';
import { UserWebViewClientImpl } from '@chat-clean-architecture/chat/adapters/views';
import { IChatApiController } from '@chat-clean-architecture/chat/adapters/controllers';

@Component({
  selector: 'cca-chat-page',
  templateUrl: './chat-page.component.html',
  providers: [
    { provide: CHAT_VIEW_PROVIDER, useClass: UserWebViewClientImpl },
    {
      provide: CHAT_PRESENTATOR_PROVIDER, useFactory: presenterFactory,
      deps: [CHAT_VIEW_PROVIDER]
    },
    {
      provide: CHAT_INTERACTOR_PROVIDER,
      useFactory: interactorNetworkFactory,
      deps: [CHAT_DB_MAPPER_PROVIDER, CHAT_PRESENTATOR_PROVIDER, CHAT_SERVER_PROVIDER_PORT]
    },
    {
      provide: CHAT_CONTROLLER_PROVIDER,
      useFactory: controllerFactory,
      deps: [CHAT_INTERACTOR_PROVIDER]
    }
  ]
})
export class ChatPageComponent {

  defaultView = 'native'; // or material

  private _activeUserId = 0;
  @Input() set activeUserId(value: number) {
    if (value == null || value == undefined) return;
    this._activeUserId = value;
    this.chatController.initUserConnection(value);
  }
  get activeUserId() { return this._activeUserId }

  constructor(protected route: ActivatedRoute,
    @Inject(CHAT_CONTROLLER_PROVIDER) public chatController: IChatApiController,
    @Inject(CHAT_VIEW_PROVIDER) public chatview: IChatView) { }
}

