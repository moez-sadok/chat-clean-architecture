import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SEND_MESSAGE_HTTP_API_CLIENT, sendMessageProviders } from './send-message.main.providers';
import { SendMessageSpaClient } from './send-message.spa.client';

@Component({
  selector: 'cca-send-message',
  templateUrl: './send-message.component.html',
  standalone: true,
  imports: [CommonModule],
  providers: [...sendMessageProviders]
})
export class SendMessageComponent {

  roomId = -1;
  userId = -1;

  constructor(route: ActivatedRoute,
    @Inject(SEND_MESSAGE_HTTP_API_CLIENT) private sendMessageClient: SendMessageSpaClient
  ) {
    route.paramMap.subscribe(params => {
      this.userId = Number(params.get('userId') ?? -1);
      this.roomId = Number(params.get('roomId') ?? -1);
    });
  }

  // the result is presented by the use case's presenter into the view the page provided
  send(message: string): Promise<unknown> {
    return this.sendMessageClient.sendMessage(this.roomId, this.userId, message);
  }

}
