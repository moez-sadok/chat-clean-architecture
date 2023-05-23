import { Controller, Get, Inject, Optional, Param, Query } from '@nestjs/common';
import { IChatApiController } from '@chat-clean-architecture/chat/adapters/controllers';
import { RoomOutputData, MessageOutputData } from '@chat-clean-architecture/chat/application-business-rules/interactor';

/* First solution: 
 create a facade for the app and return the data inside the flow (interactor -> controller)
*/

/* SECOND solution 
(controller use the presenter) see the chat-http-api.controller.presenter.ts file
*/

@Controller()
export class ChatHttpApiadApterController {// DI (at is) or extends ChatControllerMemoryImpl or implements IChatController (with SIP)

  constructor(
    @Optional() @Inject('CHAT_CONTROLLER_PROVIDER') private chatController: IChatApiController
  ) { }

  @Get('chat-user-rooms/:userId')
  getChatPageView(@Param() params: any) {
    return this.chatController.getUserRooms(+params.userId);
  }

  @Get('chat-room-messages/:roomId')
  getSelectedRoomMessages(@Query() query: any) {
    return this.chatController.getRoomMessages(+query.roomId, query.roomName, +query.userId);
  }

}

