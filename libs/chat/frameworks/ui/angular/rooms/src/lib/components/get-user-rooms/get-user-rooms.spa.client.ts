import { Inject } from "@angular/core";
import { Router } from "@angular/router";
import { IHttpController } from "@cca/core-controllers";
import { GET_USER_ROOMS_HTTP_URL } from "@cca/core-features";

//use the router to orchestrates UI (statless)
export class GetUserRoomsSpaClient {

  constructor(
    @Inject('GET_ROOMS_ByUserApiClientControllerAdapter')
    private clientControllerAdapter: IHttpController,
    private router : Router
  ) { }

  async getUserRooms(userId: number): Promise<any> {
    const url = `${GET_USER_ROOMS_HTTP_URL}/${userId}`;
    const res = await fetch(url).then(res => res.json());
    this.clientControllerAdapter.handle(res);
  }

  openRoom(userId: number,roomId:number){
    this.router.navigate(['/user', userId, roomId]);
  }

}
