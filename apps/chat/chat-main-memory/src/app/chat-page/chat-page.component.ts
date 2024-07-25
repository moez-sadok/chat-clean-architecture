import { Component, Inject, Input} from '@angular/core';
import { CHAT_CONTROLLER_PROVIDER, CHAT_DB_MAPPER_PROVIDER, 
    CHAT_INTERACTOR_PROVIDER, CHAT_PRESENTATOR_PROVIDER, 
    CHAT_SERVER_CONTROLLER_PROVIDER, 
    CHAT_SERVER_PROVIDER_PORT, CHAT_VIEW_PROVIDER, 
    controllerClientWsAdapterFactory, 
    controllerMomoryFactory, interactorNetworkFactory, presenterFactory } from '../main-chat-front-provider';
import { UserWebViewClientImpl } from '@chat-clean-architecture/chat/adapters/views';
import { ActivatedRoute } from '@angular/router';
import { IChatHttpController, IChatWsController } from '@chat-clean-architecture/chat/adapters/controllers';
import { IChatView } from '@chat-clean-architecture/chat/adapters/presenters';
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
      useFactory: controllerMomoryFactory,
      deps: [CHAT_INTERACTOR_PROVIDER]
    },
    {
      provide: CHAT_SERVER_CONTROLLER_PROVIDER,
      useFactory: controllerClientWsAdapterFactory,
      deps: [CHAT_INTERACTOR_PROVIDER,CHAT_PRESENTATOR_PROVIDER]
    }
  ]
})
export class ChatPageComponent {
    private _activeUserId = 0;
    @Input() set activeUserId(value: number) {
      if (value == null || value == undefined) return;
      this._activeUserId = value;
      this.chatServerController.connectClient(value);
      this.chatController.getUserRooms(value);
    }
    get activeUserId() { return this._activeUserId }
  
    constructor(protected route: ActivatedRoute,
      @Inject(CHAT_CONTROLLER_PROVIDER) public chatController: IChatHttpController,
      @Inject(CHAT_SERVER_CONTROLLER_PROVIDER) public chatServerController: IChatWsController,
      @Inject(CHAT_VIEW_PROVIDER) public chatview: IChatView) { }
}

