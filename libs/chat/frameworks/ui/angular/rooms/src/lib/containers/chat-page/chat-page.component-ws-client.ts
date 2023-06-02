import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatPageComponent } from './chat-page.component';
import { CHAT_CONTROLLER_PROVIDER, CHAT_PRESENTATOR_PROVIDER, CHAT_VIEW_PROVIDER, controllerClientAdapterFactory, presenterFactory } from '../../services/main-chat-front-provider';
import { UserWebViewClientImpl } from '@chat-clean-architecture/chat/adapters/views';

@Component({
  selector: 'cca-chat-page-ws-client',
  templateUrl: './chat-page.component.html',
  providers: [
    { provide: CHAT_VIEW_PROVIDER, useClass: UserWebViewClientImpl   /* UserWebViewClientImpl */ },
    {
      provide: CHAT_PRESENTATOR_PROVIDER, useFactory: presenterFactory,
      deps: [CHAT_VIEW_PROVIDER]
    },
    {
      provide: CHAT_CONTROLLER_PROVIDER,
      useFactory: controllerClientAdapterFactory,
      deps: [HttpClient, CHAT_PRESENTATOR_PROVIDER]
    }
  ]
})
export class ChatPageWsHttpClientComponent extends ChatPageComponent {

}

