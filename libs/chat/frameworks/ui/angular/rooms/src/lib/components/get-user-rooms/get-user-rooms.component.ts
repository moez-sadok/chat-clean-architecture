import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { IGetRoomsByUserView } from '@cca/core-features';
import { GET_ROOMS_BY_USER_HTTP_API_CLIENT, GET_ROOMS_BY_USER_VIEW, getRoomsByUserProviders } from './get-user-rooms.main.providers';
import { GetUserRoomsSpaClient } from './get-user-rooms.spa.client';
import { ActivatedRoute, RouterModule } from '@angular/router';

//full independent 
@Component({
  selector: 'cca-get-user-rooms',
  templateUrl: './get-user-rooms.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [...getRoomsByUserProviders]
})
export class GetUserRoomsComponent {

  userId!: number;

  constructor(
    private route: ActivatedRoute,
    @Inject(GET_ROOMS_BY_USER_VIEW) public getRoomsView: IGetRoomsByUserView,
    @Inject(GET_ROOMS_BY_USER_HTTP_API_CLIENT) public getRoomsController: GetUserRoomsSpaClient
  ) {
    this.userId = +this.route.snapshot.paramMap.get('userId')!;
    if (this.userId >= 0) this.getRoomsController.getUserRooms(this.userId);
  }

}
