import { Controller,Get,Param, Query} from '@nestjs/common';
import { ChatMainApiImpl } from '../main/chat-main-api-impl';

/* First solution: 
 create a facade for the app and return the data inside the flow (interactor -> controller)
*/

/* SECOND solution 
(controller use the presenter) see the chat-http-api.controller.presenter.ts file
*/

@Controller()
export class ChatHttpApiadApterController {//extends ChatControllerMemoryImpl  //implements IChatController (to create an adapter )

  constructor(private readonly chatApiMainService: ChatMainApiImpl) {}

  @Get('chat-user-page-view/:userId')
  getChatPageView(@Param() params:any)/*ChatDataViewModelDto*/ {
    return this.chatApiMainService.getUserChatRooms(+params.userId);
  }

  @Get('chat-room-messages/:roomId')
  getSelectedRoomMessages(@Query() query:any)/*MessageDataViewModelDto[]*/    {
    return this.chatApiMainService.getRoomMessages(
      +query.roomId,query.roomName, +query.userId);
  }

}

