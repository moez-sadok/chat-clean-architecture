import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectUserComponent } from '../../../components/connect-user/connect-user.component';
import { getUserByIdProviders } from '../../../components/connect-user/get-user-by-id.main.providers';
import { GetRoomMessagesComponent } from '../../../components/get-room-messages/get-room-messages.component';
import { GetUserRoomsComponent } from '../../../components/get-user-rooms/get-user-rooms.component';
import { SendMessageComponent } from '../../../components/send-message/send-message.component';
import { getChatPageFacadeProviders } from '../../../providers/chat-page.main.providers';
import { getMessagePresenterProviders } from '../../../providers/shared-get-messages.presenter.provider';
import { sendMessageInRoomProviders } from '../../../providers/send-message-in-room.providers';

@Component({
  selector: 'cca-chat-page',
  templateUrl: './chat-page.component.html',
  standalone: true,
  imports: [
    CommonModule,
    // share the get-messages presenter provided below
    GetRoomMessagesComponent,
    SendMessageComponent,
    // fully isolated
    GetUserRoomsComponent,
    ConnectUserComponent
  ],
  providers: [
    ...getMessagePresenterProviders,
    ...sendMessageInRoomProviders,
    ...getChatPageFacadeProviders,
    ...getUserByIdProviders
  ]
})
export class ChatPageComponent {}
