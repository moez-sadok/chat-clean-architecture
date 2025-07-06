import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { CHAT_SERVER_CONTROLLER_PROVIDER } from '../../providers/chat-page.main.providers';
import { ActivatedRoute } from '@angular/router';
import { GET_USER_BY_ID_HTTP_API_CLIENT, GET_USER_BY_ID_VIEW } from './get-user-by-id.main.providers';
import { GetUserByIdSpaClient } from './get-user-by-id.spa.client';
import { IGetUserByIdView } from '@cca/core-features';
import { IChatWsController } from '@cca/core-controllers';

@Component({
  selector: 'cca-connect-user',
  templateUrl: './connect-user.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class ConnectUserComponent {

  constructor(private route: ActivatedRoute,
    @Inject(GET_USER_BY_ID_HTTP_API_CLIENT) public chatController: GetUserByIdSpaClient,
    @Inject(GET_USER_BY_ID_VIEW) public chatview: IGetUserByIdView,
    //
    @Inject(CHAT_SERVER_CONTROLLER_PROVIDER) public wsController: IChatWsController
  ) {

    const userId = +this.route.snapshot.paramMap.get('userId')!;
    if (userId != null) {
      this.chatController.getUserById(userId);
      this.wsController.connectClient(userId);
    }
  }
}
