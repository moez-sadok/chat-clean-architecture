import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { IChatHttpController, IChatWsController } from '@cca/core-controllers';
import { IChatView } from '@cca/core-presenters';
import { CHAT_CONTROLLER_PROVIDER, CHAT_SERVER_CONTROLLER_PROVIDER, CHAT_VIEW_PROVIDER } from '../../providers/chat-page.main.providers';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cca-connect-user',
  templateUrl: './connect-user.component.html',
  standalone: true,
  imports: [ CommonModule]
})
export class ConnectUserComponent {

  constructor(private route: ActivatedRoute,
    @Inject(CHAT_CONTROLLER_PROVIDER) public chatController: IChatHttpController,
    @Inject(CHAT_SERVER_CONTROLLER_PROVIDER) public wsController: IChatWsController,
    @Inject(CHAT_VIEW_PROVIDER) public chatview: IChatView) {

    const userId = +this.route.snapshot.paramMap.get('userId')!;
    if (userId != null) {
      this.chatController.getUserById(userId);
      this.wsController.connectClient(userId);
    }
  }
}
