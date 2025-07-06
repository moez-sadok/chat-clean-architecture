import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ConnectUserComponent } from '../../../components/connect-user/connect-user.component';
import { getUserByIdProviders } from '../../../components/connect-user/get-user-by-id.main.providers';
import { GetRoomMessagesComponent } from '../../../components/get-room-messages/get-room-messages.component';
import { getMessagesByRoomProviders } from '../../../components/get-room-messages/get-room-messages.main.providers';
import { SendMessageComponent } from '../../../components/send-message/send-message.component';
import { getChatPageFacadeProviders } from '../../../providers/chat-page.main.providers';

@Component({
  selector: 'cca-mobile-chat-message-page',
  templateUrl: './mobile-chat-message-page.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    //
    SendMessageComponent,
    ConnectUserComponent,
    GetRoomMessagesComponent
  ],
  providers: [
    ...getChatPageFacadeProviders,
    ...getMessagesByRoomProviders,
    ...getUserByIdProviders
  ]
})
export class MobileChatMessagePageComponent {

  userId!: number;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('userId')!;
    });
  }
}
