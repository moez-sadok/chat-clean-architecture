import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IGetMessagesByRoomPresenterOutput, SendMessageOutputData } from '@cca/core-features';
import { ConnectUserComponent } from '../../../components/connect-user/connect-user.component';
import { getUserByIdProviders } from '../../../components/connect-user/get-user-by-id.main.providers';
import { GetRoomMessagesComponent } from '../../../components/get-room-messages/get-room-messages.component';
import { GetUserRoomsComponent } from '../../../components/get-user-rooms/get-user-rooms.component';
import { SendMessageComponent } from '../../../components/send-message/send-message.component';
import { getChatPageFacadeProviders } from '../../../providers/chat-page.main.providers';
import { GET_MESSAGES_BY_ROOM_PRESENTER, getMessagePresenterProviders } from '../../../providers/shared-get-messages.presenter.provider';

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
    ...getChatPageFacadeProviders,
    ...getUserByIdProviders
  ]
})
export class ChatPageComponent {

  constructor(@Inject(GET_MESSAGES_BY_ROOM_PRESENTER) private roomMessages: IGetMessagesByRoomPresenterOutput) {}

  // the page composes two use cases: what send-message returns is shown by get-messages-by-room
  showSentMessage(message: SendMessageOutputData): void {
    this.roomMessages.presentNewMessage(message);
  }

}
