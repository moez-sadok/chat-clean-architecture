import { Body, Controller, Get, Inject, Optional, Param, Post, Query } from '@nestjs/common';
import { IChatHttpController } from '@chat-clean-architecture/chat/adapters/controllers';

@Controller()
export class ChatHttpAdapterController implements IChatHttpController { 

  constructor(@Optional() @Inject('CHAT_CONTROLLER_PROVIDER') 
      private chatController: IChatHttpController
  ) { }

  @Get('chat-user-rooms/:userId')
  getUserRooms(@Param() params: any) {
    return this.chatController.getUserRooms(+params.userId);
  }

  @Get('chat-user/:userId')
  getUserById(@Param() params: any) {
    return this.chatController.getUserById(+params.userId);
  }

  @Get('chat-room-messages')
  getRoomMessages(@Query() query: any) {
    return this.chatController.getRoomMessages(+query.roomId, query.roomName, +query.userId);
  }

  @Post('send-message')
  sendMessage(@Body() message:any) {
    return this.chatController.sendMessage(+message.roomId, +message.userId ,message.message );
  }

}

//DI (at is) or extends ChatControllerApiImpl / implements IChatHttpController (with SIP)

// /* First solution: 
//  create a facade for the app and return the data inside the flow (interactor -> controller)
// */

// /* SECOND solution 
// (controller use the presenter) see the chat-http-api.controller.presenter.ts file
// */

// //NOT used yet (on cheking ... cqrs/ full ws )
// /* SECOND solution - controller use the presenter (see clean architecture page 72 vs 118) to contunie cheking */

// //https://softwareengineering.stackexchange.com/questions/357052/clean-architecture-use-case-containing-the-presenter-or-returning-data
// //https://stackoverflow.com/questions/70913826/clean-architecture-can-the-preseter-talk-to-to-the-controller
// //Temp solution (not recomded using controller with presenter see also :
// //https://softwareengineering.stackexchange.com/questions/357052/clean-architecture-use-case-containing-the-presenter-or-returning-data
