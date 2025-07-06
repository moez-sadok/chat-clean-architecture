import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GET_MESSAGES_BY_ROOM_HTTP_API_CLIENT, GET_MESSAGES_BY_ROOM_VIEW } from './get-room-messages.main.providers';
import { GetRoomMessagesSpaClient } from './get-room-messages.spa.client';
import { IGetMessagesByRoomView } from '@cca/core-features';

@Component({
  selector: 'cca-get-room-messages',
  templateUrl: './get-room-messages.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class GetRoomMessagesComponent {

  constructor(
    private route: ActivatedRoute,
    @Inject(GET_MESSAGES_BY_ROOM_HTTP_API_CLIENT) public chatController: GetRoomMessagesSpaClient,
    @Inject(GET_MESSAGES_BY_ROOM_VIEW) public chatview: IGetMessagesByRoomView) {
    this.route.paramMap.subscribe(params => {
      const roomId = params.get('roomId') ? +params.get('roomId')! : null;
      if (roomId != null) this.chatController.getRoomMessages(roomId);
    });

  }

}