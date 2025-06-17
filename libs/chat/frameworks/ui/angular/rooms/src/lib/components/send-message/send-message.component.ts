import { Component, Inject } from '@angular/core';
import { IChatHttpController } from '@cca/core-controllers';
import { IChatView } from '@cca/core-presenters';
import { CHAT_CONTROLLER_PROVIDER, CHAT_VIEW_PROVIDER } from '../../pages/chat-page/chat-page.main.providers';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cca-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class SendMessageComponent {

  roomId!: number;
  userId!: number;

  constructor(private route: ActivatedRoute,
    @Inject(CHAT_CONTROLLER_PROVIDER) public chatController: IChatHttpController,
    @Inject(CHAT_VIEW_PROVIDER) public chatview: IChatView) {

    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('userId')!;
      this.roomId = params.get('roomId') ? +params.get('roomId')! : -1;
    });
  }


}
