import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatDataViewModelDto, RoomViewModel } from '@chat-clean-architecture/chat/adapters/presenters';

@Component({
  selector: 'cca-chat-view',
  templateUrl: './chat-view.component.native.html',
  styleUrls: ['./chat-view.component.native.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
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
  @Output() selectRoom: EventEmitter<RoomViewModel> = new EventEmitter();

}
