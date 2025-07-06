import { Inject } from "@angular/core";
import { IHttpController } from "@cca/core-controllers";
import { GET_USER_BY_ID_HTTP_URL } from "@cca/core-features";

//use the router to orchestrates UI (statless)
export class GetUserByIdSpaClient {

  constructor(
    @Inject('GET_USER_BY_IDApiClientControllerAdapter')
    private clientControllerAdapter: IHttpController
  ) { }

  async getUserById(userId: number): Promise<any> {
    const url = `${GET_USER_BY_ID_HTTP_URL}/${userId}`;
    const res = await fetch(url).then(res => res.json());
    this.clientControllerAdapter.handle(res);
  }
  
}
