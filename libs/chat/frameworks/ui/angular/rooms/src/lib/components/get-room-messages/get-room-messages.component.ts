import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GET_MESSAGES_BY_ROOM_HTTP_API_CLIENT, getMessagesByRoomProviders } from './get-room-messages.main.providers';
import { GetRoomMessagesSpaClient } from './get-room-messages.spa.client';
import { IGetMessagesByRoomReactiveView } from '@cca/core-features';
import { GET_MESSAGES_BY_ROOM_REACTIVE_VIEW } from '../../providers/shared-get-messages.presenter.provider';
import { isChangeDetectable } from '../../adapters/angular-change-detectable';

@Component({
  selector: 'cca-get-room-messages',
  templateUrl: './get-room-messages.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  providers: [getMessagesByRoomProviders]
})
export class GetRoomMessagesComponent {

  constructor(
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    @Inject(GET_MESSAGES_BY_ROOM_HTTP_API_CLIENT) public chatController: GetRoomMessagesSpaClient,
    @Inject(GET_MESSAGES_BY_ROOM_REACTIVE_VIEW) public chatview: IGetMessagesByRoomReactiveView
  ) {
    this.route.paramMap.subscribe(params => {
      const roomId = params.get('roomId') ? +params.get('roomId')! : null;
      if (roomId != null) this.chatController.getRoomMessages(roomId);
    });

    // Framework-layer concern: if the reactive adapter needs CD, bind it (no need it with signals, but needed for RxJS-based reactive view)
    if (isChangeDetectable(this.chatview.vm)) {
      this.chatview.vm.bindChangeDetection(this.cdRef);
    }
  }

  get vm() {
    return this.chatview.getViewModel();
  }

}