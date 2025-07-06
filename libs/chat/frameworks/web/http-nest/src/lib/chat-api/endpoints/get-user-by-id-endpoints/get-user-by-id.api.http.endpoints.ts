import { Controller, Get, Inject, Optional, Param } from '@nestjs/common';
import { GET_USER_BY_ID_HTTP_URI } from '@cca/core-features';
import { IHttpController } from '@cca/core-controllers';

@Controller()
export class GetUserByIdHttpApiEndPoint {

  constructor(
    @Optional() @Inject('GET_USER_ByIdApiServerControllerAdapter') 
    private getUserByIdControllerAdapter: IHttpController
  ) { }

  @Get(`${GET_USER_BY_ID_HTTP_URI}/:userId`)
  getRoomMessages(@Param() params: any) {
    return this.getUserByIdControllerAdapter.handle({ userId: +params.userId });
  }

}
