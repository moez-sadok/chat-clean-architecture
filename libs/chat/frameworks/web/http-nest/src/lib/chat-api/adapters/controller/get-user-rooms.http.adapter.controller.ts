import { Controller, Get, Inject, Optional, Param } from '@nestjs/common';
import { GET_USER_ROOMS_HTTP_URI, IGetRoomsByUserPresenter, IGetRoomsByUserRequester } from '@cca/core-features';
import { IHttpController } from '@cca/core-controllers';

@Controller()
export class GetUserRoomsHttpAdapterController implements IHttpController {

  constructor(
    @Optional() @Inject('GET_ROOMS_ByUserFeature') private feature: IGetRoomsByUserRequester,
    @Optional() @Inject('GET_ROOMS_ByUserPresenter') public presenter: IGetRoomsByUserPresenter,
  ) { }

  @Get(`${GET_USER_ROOMS_HTTP_URI}/:userId`)
  async handle(@Param() params: any) {
    const rooms = await this.feature.getRoomsByUser({ userId: +params.userId });
    return this.presenter.selectedRoomsByUser(rooms);
  }

}
