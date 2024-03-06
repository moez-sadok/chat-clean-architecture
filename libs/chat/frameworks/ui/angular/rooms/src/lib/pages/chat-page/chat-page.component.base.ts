import { Component, Inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CHAT_CONTROLLER_PROVIDER, CHAT_VIEW_PROVIDER } from '../../services/main-chat-front-provider';
import { IChatView } from '@chat-clean-architecture/chat/adapters/presenters';
import { IChatController } from '@chat-clean-architecture/chat/adapters/controllers';

@Component({
  selector: 'cca-chat-base-page',
  templateUrl: './chat-page.component.html'
})
export class ChatPageBaseComponent {

  private _activeUserId = 0;
  @Input() set activeUserId(value: number) {
    if (value == null || value == undefined) return;
    this._activeUserId = value;
    this.chatController.connectClient(value);
    this.chatController.getUserRooms(value);
  }
  get activeUserId() { return this._activeUserId }

  constructor(protected route: ActivatedRoute,
    @Inject(CHAT_CONTROLLER_PROVIDER) public chatController: IChatController,
    @Inject(CHAT_VIEW_PROVIDER) public chatview: IChatView) { }
}

