import { IHttpController } from "@cca/core-controllers";
import { GET_USER_BY_ID_HTTP_URL, UserOutputData } from "@cca/core-features";

// fetches the API and hands the response to the use case's client controller, which presents it
export class GetUserByIdSpaClient {

  constructor(
    private clientControllerAdapter: IHttpController<UserOutputData | null, void>
  ) { }

  async getUserById(userId: number): Promise<UserOutputData | null> {
    const url = `${GET_USER_BY_ID_HTTP_URL}/${userId}`;
    const res: UserOutputData | null = await fetch(url).then(res => res.json());
    await this.clientControllerAdapter.handle(res);
    return res;
  }
  
}
