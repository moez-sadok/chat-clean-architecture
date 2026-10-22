import { Controller, Get, Inject, Param } from '@nestjs/common';
import { GET_USER_BY_ID_HTTP_CONTROLLER, GET_USER_BY_ID_HTTP_URI } from '@cca/core-features';
import { IHttpController } from '@cca/core-controllers';

@Controller()
export class GetUserByIdHttpApiEndPoint {

  constructor(
    @Inject(GET_USER_BY_ID_HTTP_CONTROLLER)
    private getUserByIdController: IHttpController
  ) { }

  @Get(`${GET_USER_BY_ID_HTTP_URI}/:userId`)
  getUserById(@Param('userId') userId: string) {
    return this.getUserByIdController.handle({ userId: +userId });
  }

}
