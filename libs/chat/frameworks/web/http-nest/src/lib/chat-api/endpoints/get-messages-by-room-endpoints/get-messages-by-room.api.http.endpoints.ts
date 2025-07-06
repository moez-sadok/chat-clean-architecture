import { Controller, Get, Inject, Optional, Param } from '@nestjs/common';
import { GET_ROOM_MESSAGES_HTTP_URI } from '@cca/core-features';
import { IHttpController } from '@cca/core-controllers';

@Controller()
export class GetRoomMessagesHttpApiEndPoint {

  constructor(
    @Optional() @Inject('GET_MESSAGES_ByRoomApiServerControllerAdapter') 
    private getMessagesByRoomControllerAdapter: IHttpController
  ) { }

  @Get(`${GET_ROOM_MESSAGES_HTTP_URI}/:roomId`)
  getRoomMessages(@Param() params: any) {
    return this.getMessagesByRoomControllerAdapter.handle({ roomId: +params.roomId });
  }

}
