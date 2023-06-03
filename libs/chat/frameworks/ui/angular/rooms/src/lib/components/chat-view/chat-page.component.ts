import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatDataViewModelDto, RoomDataViewModelDto } from '@chat-clean-architecture/chat/adapters/presenters';

@Component({
  selector: 'cca-chat-view',
  templateUrl: './chat-page.component.native.html',//'./chat-page.component.material.html',
  styleUrls: ['./chat-page.component.native.scss']
})
export class ChatViewComponent {

  private _chatPageView!: ChatDataViewModelDto;
  @Input()
  set chatPageView(value: ChatDataViewModelDto | null) {
    if(value) this._chatPageView = value;
  }
  get chatPageView() {
    return this._chatPageView;
  }

  @Output() leaveChatRoom: EventEmitter<number> = new EventEmitter();
  @Output() sendMessage: EventEmitter<string> = new EventEmitter();
  @Output() selectRoom: EventEmitter<RoomDataViewModelDto> = new EventEmitter();
}
