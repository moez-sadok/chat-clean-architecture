import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GET_MESSAGES_BY_ROOM_HTTP_API_CLIENT, GET_MESSAGES_BY_ROOM_REACTIVE_VIEW, GET_MESSAGES_BY_ROOM_VIEW, getMessagesByRoomProviders } from './get-room-messages.main.providers';
import { GetRoomMessagesSpaClient } from './get-room-messages.spa.client';
import { IGetMessagesByRoomReactiveView, IGetMessagesByRoomView } from '@cca/core-features';
import { ReactiveRxjsObservableAdapter } from '../../adapters/reactive-ngrx-observable.adapter';

@Component({
  selector: 'cca-get-room-messages',
  templateUrl: './get-room-messages.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  // providers: [
  //   getMessagesByRoomProviders
  // ]
})
export class GetRoomMessagesComponent {

  constructor(
    private route: ActivatedRoute,
    // private cdr: ChangeDetectorRef,
    @Inject(GET_MESSAGES_BY_ROOM_HTTP_API_CLIENT) public chatController: GetRoomMessagesSpaClient,
    // @Inject(GET_MESSAGES_BY_ROOM_VIEW) public chatview: IGetMessagesByRoomView
    @Inject(GET_MESSAGES_BY_ROOM_REACTIVE_VIEW) public chatview: IGetMessagesByRoomReactiveView
  ) {

    this.route.paramMap.subscribe(params => {
      const roomId = params.get('roomId') ? +params.get('roomId')! : null;
      if (roomId != null) this.chatController.getRoomMessages(roomId);
      console.log('roomId from route params: ', roomId);
    });
  }

  get vm() {
    console.log('GetRoomMessagesComponent vm: ', this.chatview.getViewModel());
    return this.chatview.getViewModel();
  }

}