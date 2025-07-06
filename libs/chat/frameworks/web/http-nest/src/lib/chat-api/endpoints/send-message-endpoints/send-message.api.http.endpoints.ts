import { Body, Controller, Inject, Optional, Post } from '@nestjs/common';
import { IHttpController } from '@cca/core-controllers';

@Controller()
export class SendMessageHttpApiEndPoint {

  constructor(
    @Optional() @Inject('SEND_MESSAGEApiServerControllerAdapter')
    private sendMessageontrollerAdapter: IHttpController
  ) { }

  @Post('send-message')
  sendMessage(@Body() message: any) {
    return this.sendMessageontrollerAdapter.handle({ roomId: +message.roomId, userId: +message.userId, message: message.message });
  }
}
