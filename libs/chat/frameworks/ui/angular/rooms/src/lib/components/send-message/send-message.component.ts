import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ISendMessageView, SendMessageOutputData } from '@cca/core-features';
import { SEND_MESSAGE_HTTP_API_CLIENT, SEND_MESSAGE_VIEW, sendMessageProviders } from './send-message.main.providers';
import { SendMessageSpaClient } from './send-message.spa.client';

@Component({
  selector: 'cca-send-message',
  templateUrl: './send-message.component.html',
  standalone: true,
  imports: [CommonModule],
  providers: [...sendMessageProviders]
})
export class SendMessageComponent {

  // the sent message, for the page to show it wherever it belongs (e.g. the room's message list)
  @Output() messageSent = new EventEmitter<SendMessageOutputData>();

  roomId = -1;
  userId = -1;

  constructor(route: ActivatedRoute,
    @Inject(SEND_MESSAGE_HTTP_API_CLIENT) private sendMessageClient: SendMessageSpaClient,
    @Inject(SEND_MESSAGE_VIEW) public sendMessageView: ISendMessageView
  ) {
    route.paramMap.subscribe(params => {
      this.userId = Number(params.get('userId') ?? -1);
      this.roomId = Number(params.get('roomId') ?? -1);
    });
  }

  async send(message: string): Promise<void> {
    this.messageSent.emit(await this.sendMessageClient.sendMessage(this.roomId, this.userId, message));
  }

}
