import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { IGetRoomsByUserView, RoomViewModel } from '@cca/core-features';
import { GET_ROOMS_BY_USER_HTTP_API_CLIENT, GET_ROOMS_BY_USER_VIEW, getRoomsByUserProviders } from './get-user-rooms.main.providers';
import { GetUserRoomsHttpApiClient } from './get-user-rooms.http.api.client';

@Component({
  selector: 'cca-get-user-rooms',
  templateUrl: './get-user-rooms.component.html',
  styleUrls: ['./get-user-rooms.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [...getRoomsByUserProviders]
})
export class GetUserRoomsComponent {

  @Output() selectRoom: EventEmitter<RoomViewModel> = new EventEmitter();

  @Input() set userId(id: number ) {
    if (id >= 0) this.httpApiClientController.getUserRooms(id)
  }

  constructor(
    @Inject(GET_ROOMS_BY_USER_VIEW) public getRoomsView: IGetRoomsByUserView,
    @Inject(GET_ROOMS_BY_USER_HTTP_API_CLIENT) public httpApiClientController: GetUserRoomsHttpApiClient
  ) { }

}
