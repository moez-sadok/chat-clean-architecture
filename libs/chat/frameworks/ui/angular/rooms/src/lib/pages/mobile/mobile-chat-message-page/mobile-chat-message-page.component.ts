import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { IGetMessagesByRoomPresenterOutput, SendMessageOutputData } from '@cca/core-features';
import { ConnectUserComponent } from '../../../components/connect-user/connect-user.component';
import { getUserByIdProviders } from '../../../components/connect-user/get-user-by-id.main.providers';
import { GetRoomMessagesComponent } from '../../../components/get-room-messages/get-room-messages.component';
import { SendMessageComponent } from '../../../components/send-message/send-message.component';
import { getChatPageFacadeProviders } from '../../../providers/chat-page.main.providers';
import { GET_MESSAGES_BY_ROOM_PRESENTER, getMessagePresenterProviders } from '../../../providers/shared-get-messages.presenter.provider';

@Component({
  selector: 'cca-mobile-chat-message-page',
  templateUrl: './mobile-chat-message-page.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SendMessageComponent,
    ConnectUserComponent,
    GetRoomMessagesComponent
  ],
  providers: [
    // the shared get-messages presenter and view, which the components below inject
    ...getMessagePresenterProviders,
    ...getChatPageFacadeProviders,
    ...getUserByIdProviders
  ]
})
export class MobileChatMessagePageComponent {

  userId = -1;

  constructor(route: ActivatedRoute,
    @Inject(GET_MESSAGES_BY_ROOM_PRESENTER) private roomMessages: IGetMessagesByRoomPresenterOutput
  ) {
    route.paramMap.subscribe(params => {
      this.userId = Number(params.get('userId') ?? -1);
    });
  }

  // the page composes two use cases: what send-message returns is shown by get-messages-by-room
  showSentMessage(message: SendMessageOutputData): void {
    this.roomMessages.presentNewMessage(message);
  }

}
