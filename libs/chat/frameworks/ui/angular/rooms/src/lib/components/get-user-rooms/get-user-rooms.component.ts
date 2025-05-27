import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, InjectionToken, Input, Output } from '@angular/core';
import {
  getRoomsByUserClientHttpControllerFactory, IGetUserRoomsHttpController,
  GetRoomsByUserClientView, getRoomsByUserPresenterUiFactory,
  IGetRoomsByUserPresenterOutput, IGetRoomsByUserView, RoomViewModel
} from '@cca/core-features';

export const GET_ROOMS_BY_USER_VIEW = new InjectionToken<IGetRoomsByUserView>('GetRoomsByUserView');
export const GET_ROOMS_BY_USER_PRESENTER = new InjectionToken<IGetRoomsByUserPresenterOutput>('GetRoomsByUserPresenter');
export const GET_ROOMS_BY_USER_CONTROLLER = new InjectionToken<IGetUserRoomsHttpController>('GetRoomsByUserController');

@Component({
  selector: 'cca-get-user-rooms',
  templateUrl: './get-user-rooms.component.html',
  styleUrls: ['./get-user-rooms.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [
    { provide: GET_ROOMS_BY_USER_VIEW, useClass: GetRoomsByUserClientView },
    {
      provide: GET_ROOMS_BY_USER_PRESENTER, useFactory: getRoomsByUserPresenterUiFactory,
      deps: [GET_ROOMS_BY_USER_VIEW]
    },
    {
      provide: GET_ROOMS_BY_USER_CONTROLLER, useFactory: getRoomsByUserClientHttpControllerFactory,
      deps: [GET_ROOMS_BY_USER_PRESENTER]
    }
  ]
})
export class GetUserRoomsComponent {

  @Output() selectRoom: EventEmitter<RoomViewModel> = new EventEmitter();

  @Input() set userId(id: number) {
    if (id >= 0) this.getUserRoomsHttpController.getUserRooms({ userId: id })
  }

  constructor(
    @Inject(GET_ROOMS_BY_USER_VIEW) public getRoomsView: IGetRoomsByUserView,
    @Inject(GET_ROOMS_BY_USER_CONTROLLER) public getUserRoomsHttpController: IGetUserRoomsHttpController
  ) { }

}
