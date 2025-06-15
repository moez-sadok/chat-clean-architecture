import { Inject } from "@angular/core";
import { IHttpController } from "@cca/core-controllers";
import { GET_USER_ROOMS_HTTP_URL } from "@cca/core-features";

export class GetUserRoomsHttpApiClient {

  constructor(
    @Inject('GET_ROOMS_ByUserApiClientControllerAdapter')
    private getRoomsByUserClientControllerAdapter: IHttpController
  ) { }

  async getUserRooms(userId: number): Promise<any> {
    const url = `${GET_USER_ROOMS_HTTP_URL}/${userId}`;
    const res = await fetch(url).then(res => res.json());
    this.getRoomsByUserClientControllerAdapter.handle(res);
  }

}
