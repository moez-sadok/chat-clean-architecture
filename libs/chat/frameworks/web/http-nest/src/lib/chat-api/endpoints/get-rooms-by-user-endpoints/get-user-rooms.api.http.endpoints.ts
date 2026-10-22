import { Controller, Get, Inject, Param } from '@nestjs/common';
import { GET_ROOMS_BY_USER_HTTP_CONTROLLER, GET_USER_ROOMS_HTTP_URI } from '@cca/core-features';
import { IHttpController } from '@cca/core-controllers';

@Controller()
export class GetUserRoomsHttpApiEndPoint {

  constructor(
    @Inject(GET_ROOMS_BY_USER_HTTP_CONTROLLER)
    private getRoomsByUserController: IHttpController
  ) { }

  @Get(`${GET_USER_ROOMS_HTTP_URI}/:userId`)
  getUserRooms(@Param('userId') userId: string) {
    return this.getRoomsByUserController.handle({ userId: +userId });
  }

}
