import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetUserRoomsComponent } from '../../components/get-user-rooms/get-user-rooms.component';
import { GetRoomMessagesComponent } from '../../components/get-room-messages/get-room-messages.component';
import { SendMessageComponent } from '../../components/send-message/send-message.component';
import { ConnectUserComponent } from '../../components/connect-user/connect-user.component';
import { getChatPageFacadeProviders } from './chat-page.main.providers';

@Component({
  selector: 'cca-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ConnectUserComponent,
    SendMessageComponent,
    //full isolated
    GetUserRoomsComponent,
    GetRoomMessagesComponent,

  ],
  providers: [...getChatPageFacadeProviders]
})
export class ChatPageComponent {}
