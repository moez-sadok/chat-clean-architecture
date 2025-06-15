import { Component, Inject } from '@angular/core';
import { UserWebViewClientImpl } from '@cca/core-views';
import { ActivatedRoute } from '@angular/router';
import { InjectionToken } from "@angular/core";
import { ChatControllerHttpClientAdapterImpl, ChatControllerWsClientAdapterImpl, IChatHttpController, IChatWsController } from "@cca/core-controllers";
import { ChatUiPresenterImpl, IChatView, IChatAppFacadePresenterOutput } from "@cca/core-presenters";
import { CommonModule } from '@angular/common';
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

  constructor(protected route: ActivatedRoute,
    @Inject(CHAT_CONTROLLER_PROVIDER) public chatController: IChatHttpController,
    @Inject(CHAT_SERVER_CONTROLLER_PROVIDER) public wsController: IChatWsController,
    @Inject(CHAT_VIEW_PROVIDER) public chatview: IChatView) {

    const userId = +this.route.snapshot.paramMap.get('userId')!;
    if (userId != null) {
      this.chatController.getUserById(userId);
      this.wsController.connectClient(userId);
    }
  }

}
