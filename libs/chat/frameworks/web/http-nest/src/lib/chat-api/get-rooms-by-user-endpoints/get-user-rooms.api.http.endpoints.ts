import { Controller, Get, Inject, Optional, Param } from '@nestjs/common';
import { GET_USER_ROOMS_HTTP_URI } from '@cca/core-features';
import { IHttpController } from '@cca/core-controllers';

@Controller()
export class GetUserRoomsHttpApiEndPoint {

  constructor(
    @Optional() @Inject('GET_ROOMS_ByUserApiServerControllerAdapter') 
    private getRoomsByUserControllerAdapter: IHttpController
  ) { }

  @Get(`${GET_USER_ROOMS_HTTP_URI}/:userId`)
  async getUserRooms(@Param() params: any) {
    return this.getRoomsByUserControllerAdapter.handle({ userId: +params.userId })
  }

}
