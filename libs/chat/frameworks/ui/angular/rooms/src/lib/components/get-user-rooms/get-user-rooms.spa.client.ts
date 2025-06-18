import { Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { IHttpController } from "@cca/core-controllers";
import { GET_USER_ROOMS_HTTP_URL } from "@cca/core-features";

//use the router to orchestrates UI (statless way)
export class GetUserRoomsSpaClient {

  constructor(
    @Inject('GET_ROOMS_ByUserApiClientControllerAdapter')
    private clientControllerAdapter: IHttpController,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async getUserRooms(userId: number): Promise<any> {
    const url = `${GET_USER_ROOMS_HTTP_URL}/${userId}`;
    const res = await fetch(url).then(res => res.json());
    this.clientControllerAdapter.handle(res);
  }

  openRoom(userId: number, roomId: number) {
    const currentUrl = this.router.url;
    const currRoomId = this.route.snapshot.paramMap.get('roomId')!;
    if (currRoomId) this.router.navigate(['/user', userId, roomId]);
    else this.router.navigateByUrl(`${currentUrl}/${roomId}`);
  }

}
