import { Controller, Get, Inject, Param } from '@nestjs/common';
import { GET_MESSAGES_BY_ROOM_HTTP_CONTROLLER, GET_ROOM_MESSAGES_HTTP_URI } from '@cca/core-features';
import { IHttpController } from '@cca/core-controllers';

@Controller()
export class GetRoomMessagesHttpApiEndPoint {

  constructor(
    @Inject(GET_MESSAGES_BY_ROOM_HTTP_CONTROLLER)
    private getMessagesByRoomController: IHttpController
  ) { }

  @Get(`${GET_ROOM_MESSAGES_HTTP_URI}/:roomId`)
  getRoomMessages(@Param('roomId') roomId: string) {
    return this.getMessagesByRoomController.handle({ roomId: +roomId });
  }

}
