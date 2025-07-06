import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectUserComponent } from '../../../components/connect-user/connect-user.component';
import { getUserByIdProviders } from '../../../components/connect-user/get-user-by-id.main.providers';
import { GetRoomMessagesComponent } from '../../../components/get-room-messages/get-room-messages.component';
import { getMessagesByRoomProviders } from '../../../components/get-room-messages/get-room-messages.main.providers';
import { GetUserRoomsComponent } from '../../../components/get-user-rooms/get-user-rooms.component';
import { SendMessageComponent } from '../../../components/send-message/send-message.component';
import { getChatPageFacadeProviders } from '../../../providers/chat-page.main.providers';

@Component({
  selector: 'cca-chat-page',
  templateUrl: './chat-page.component.html',
  standalone: true,
  imports: [
    CommonModule,
    // hybrid (injection by parent)
    GetRoomMessagesComponent,
    //full isolated
    GetUserRoomsComponent,
    ConnectUserComponent,
    SendMessageComponent,
  ],
  providers: [
    ...getChatPageFacadeProviders,
    ...getMessagesByRoomProviders,
    ...getUserByIdProviders
  ]
})
export class ChatPageComponent {}
