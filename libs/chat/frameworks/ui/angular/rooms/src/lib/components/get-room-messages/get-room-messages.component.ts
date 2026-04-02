import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GET_MESSAGES_BY_ROOM_HTTP_API_CLIENT, getMessagesByRoomProviders } from './get-room-messages.main.providers';
import { GetRoomMessagesSpaClient } from './get-room-messages.spa.client';
import { IGetMessagesByRoomReactiveView } from '@cca/core-features';
import { GET_MESSAGES_BY_ROOM_REACTIVE_VIEW } from '../../providers/shared-get-messages.presenter.provider';
import { AChangeDetectableComponent } from '../../adapters/angular-change-detectable';

@Component({
  selector: 'cca-get-room-messages',
  templateUrl: './get-room-messages.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  providers: [getMessagesByRoomProviders]
})
export class GetRoomMessagesComponent
  extends AChangeDetectableComponent {

  constructor(
    private route: ActivatedRoute,
    protected override cdRef: ChangeDetectorRef,
    @Inject(GET_MESSAGES_BY_ROOM_HTTP_API_CLIENT) public chatController: GetRoomMessagesSpaClient,
    @Inject(GET_MESSAGES_BY_ROOM_REACTIVE_VIEW) public chatview: IGetMessagesByRoomReactiveView
  ) {
    super(cdRef, chatview.vm);

    //To change on the controller adapter side to read abstract router 
    const roomId = +(this.route.snapshot.paramMap.get('roomId') || '-1');
    this.chatController.getRoomMessages(roomId);
  }

  get vm() {
    return this.chatview.getViewModel();
  }

}