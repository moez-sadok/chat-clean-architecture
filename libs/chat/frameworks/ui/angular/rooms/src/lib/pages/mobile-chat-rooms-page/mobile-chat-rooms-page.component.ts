import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectUserComponent } from '../../components/connect-user/connect-user.component';
import { GetUserRoomsComponent } from '../../components/get-user-rooms/get-user-rooms.component';
import { RouterModule } from '@angular/router';
import { getChatPageFacadeProviders } from '../../providers/chat-page.main.providers';
import { getMessagesByRoomProviders } from '../../components/get-room-messages/get-room-messages.main.providers';

@Component({
  selector: 'cca-mobile-chat-rooms-page',
  templateUrl: './mobile-chat-rooms-page.component.html',
  styleUrls: ['./mobile-chat-rooms-page.component.scss'],
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
    ...getMessagesByRoomProviders
  ]
})
export class MobileChatRoomsPageComponent {}
