import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConnectUserComponent } from '../../../components/connect-user/connect-user.component';
import { getUserByIdProviders } from '../../../components/connect-user/get-user-by-id.main.providers';
import { getMessagesByRoomProviders } from '../../../components/get-room-messages/get-room-messages.main.providers';
import { GetUserRoomsComponent } from '../../../components/get-user-rooms/get-user-rooms.component';
import { getChatPageFacadeProviders } from '../../../providers/chat-page.main.providers';

@Component({
  selector: 'cca-mobile-chat-rooms-page',
  templateUrl: './mobile-chat-rooms-page.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    //
    ConnectUserComponent,
    GetUserRoomsComponent
  ],
  providers: [
    ...getChatPageFacadeProviders,
    ...getMessagesByRoomProviders,
    ...getUserByIdProviders
  ]
})
export class MobileChatRoomsPageComponent {}
