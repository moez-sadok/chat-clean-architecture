import { Controller, Get, Inject, Optional, Param } from '@nestjs/common';
import { GET_USER_ROOMS_HTTP_URI, IGetRoomsByUserPresenterOutput, IGetRoomsByUserRequester, IGetUserRoomsHttpController } from '@cca/core-features';

@Controller()
export class GetUserRoomsHttpAdapterController implements IGetUserRoomsHttpController {

  constructor(
    @Optional() @Inject('GET_ROOMS_ByUserFeature') private feature: IGetRoomsByUserRequester,
    @Optional() @Inject('GET_ROOMS_ByUserPresenter') public presenter: IGetRoomsByUserPresenterOutput,
  ) { }

  @Get(`${GET_USER_ROOMS_HTTP_URI}/:userId`)
  async getUserRooms(@Param() params: any) {
    const rooms = await this.feature.getRoomsByUser({ userId: +params.userId });
    return this.presenter.selectedRoomsByUser(rooms);
  }

}
