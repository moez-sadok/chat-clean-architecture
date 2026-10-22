import { Router, ActivatedRoute } from "@angular/router";
import { IHttpController } from "@cca/core-controllers";
import { GET_USER_ROOMS_HTTP_URL, GetRoomsByUserResponseData } from "@cca/core-features";

// fetches the API and hands the response to the use case's client controller, which presents it
export class GetUserRoomsSpaClient {

  constructor(
    private clientControllerAdapter: IHttpController<GetRoomsByUserResponseData[], void>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async getUserRooms(userId: number): Promise<GetRoomsByUserResponseData[]> {
    const url = `${GET_USER_ROOMS_HTTP_URL}/${userId}`;
    const res: GetRoomsByUserResponseData[] = await fetch(url).then(res => res.json());
    await this.clientControllerAdapter.handle(res);
    return res;
  }

  openRoom(userId: number, roomId: number) {
    const currentUrl = this.router.url;
    const currRoomId = this.route.snapshot.paramMap.get('roomId');
    if (currRoomId) this.router.navigate(['/user', userId, roomId]);
    else this.router.navigateByUrl(`${currentUrl}/${roomId}`);
  }

}
