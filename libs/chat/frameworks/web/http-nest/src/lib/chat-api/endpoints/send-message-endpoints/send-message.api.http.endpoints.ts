import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SEND_MESSAGE_HTTP_CONTROLLER, SEND_MESSAGE_HTTP_URI } from '@cca/core-features';
import { IHttpController } from '@cca/core-controllers';

interface SendMessageBody {
  roomId: string | number;
  userId: string | number;
  message: string;
}

@Controller()
export class SendMessageHttpApiEndPoint {

  constructor(
    @Inject(SEND_MESSAGE_HTTP_CONTROLLER)
    private sendMessageController: IHttpController
  ) { }

  @Post(SEND_MESSAGE_HTTP_URI)
  sendMessage(@Body() body: SendMessageBody) {
    return this.sendMessageController.handle({ roomId: +body.roomId, userId: +body.userId, message: body.message });
  }
}
