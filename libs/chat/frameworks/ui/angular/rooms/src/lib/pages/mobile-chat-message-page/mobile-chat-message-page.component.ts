import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetRoomMessagesComponent } from '../../components/get-room-messages/get-room-messages.component';
import { getMessagesByRoomProviders } from '../../components/get-room-messages/get-room-messages.main.providers';
import { SendMessageComponent } from '../../components/send-message/send-message.component';
import { getChatPageFacadeProviders } from '../../providers/chat-page.main.providers';
import { ConnectUserComponent } from '../../components/connect-user/connect-user.component';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cca-mobile-chat-message-page',
  templateUrl: './mobile-chat-message-page.component.html',
  styleUrls: ['./mobile-chat-message-page.component.scss'],
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
    ...getMessagesByRoomProviders
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
