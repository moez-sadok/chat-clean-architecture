import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ConnectUserComponent } from '../../../components/connect-user/connect-user.component';
import { getUserByIdProviders } from '../../../components/connect-user/get-user-by-id.main.providers';
import { GetRoomMessagesComponent } from '../../../components/get-room-messages/get-room-messages.component';
import { SendMessageComponent } from '../../../components/send-message/send-message.component';
import { getChatPageFacadeProviders } from '../../../providers/chat-page.main.providers';
import { getMessagePresenterProviders } from '../../../providers/shared-get-messages.presenter.provider';
import { sendMessageInRoomProviders } from '../../../providers/send-message-in-room.providers';

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
    ...sendMessageInRoomProviders,
    ...getChatPageFacadeProviders,
    ...getUserByIdProviders
  ]
})
export class MobileChatMessagePageComponent {

  userId = -1;

  constructor(route: ActivatedRoute) {
    route.paramMap.subscribe(params => {
      this.userId = Number(params.get('userId') ?? -1);
    });
  }

}
