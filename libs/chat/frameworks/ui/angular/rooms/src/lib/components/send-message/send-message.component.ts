import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ISendMessageView } from '@cca/core-features';
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

  roomId!: number;
  userId!: number;

  constructor(private route: ActivatedRoute,
    @Inject(SEND_MESSAGE_HTTP_API_CLIENT) public sendMessageController: SendMessageSpaClient,
    @Inject(SEND_MESSAGE_VIEW) public sendMessageView: ISendMessageView
  ) {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('userId')!;
      this.roomId = params.get('roomId') ? +params.get('roomId')! : -1;
    });
  }

}
