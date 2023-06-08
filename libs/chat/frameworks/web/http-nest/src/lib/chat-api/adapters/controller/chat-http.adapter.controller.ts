import { Controller, Get, Inject, Optional, Param, Query } from '@nestjs/common';
import { IChatApiController } from '@chat-clean-architecture/chat/adapters/controllers';

@Controller()
export class ChatHttpAdapterController { 

  constructor(@Optional() @Inject('CHAT_CONTROLLER_PROVIDER') 
      private chatController: IChatApiController
  ) { }

  @Get('chat-user-rooms/:userId')
  getUserRoomshttp(@Param() params: any) {
    return this.chatController.getUserRooms(+params.userId);
  }

  @Get('chat-user/:userId')
  getUserhttp(@Param() params: any) {
    return this.chatController.getUserById(+params.userId);
  }

  @Get('chat-room-messages')
  getRoomMessagesHttp(@Query() query: any) {
    return this.chatController.getRoomMessages(+query.roomId, query.roomName, +query.userId);
  }

  @Get('send-message')
  receiveMessageHttp(@Query() query: any) {
    return this.chatController.sendMessage(+query.roomId, +query.userId ,query.message, );
  }

}

//DI (at is) or extends ChatControllerApiImpl / implements IChatController (with SIP)

// /* First solution: 
//  create a facade for the app and return the data inside the flow (interactor -> controller)
// */

// /* SECOND solution 
// (controller use the presenter) see the chat-http-api.controller.presenter.ts file
// */

// //NOT used yet (on cheking ... cqrs/ full ws )
// /* SECOND solution - controller use the presenter (see clean architecture page 72) to contunie cheking */

// //https://softwareengineering.stackexchange.com/questions/357052/clean-architecture-use-case-containing-the-presenter-or-returning-data
// //https://stackoverflow.com/questions/70913826/clean-architecture-can-the-preseter-talk-to-to-the-controller
// //Temp solution (not recomded using controller with presenter see also :
// //https://softwareengineering.stackexchange.com/questions/357052/clean-architecture-use-case-containing-the-presenter-or-returning-data
