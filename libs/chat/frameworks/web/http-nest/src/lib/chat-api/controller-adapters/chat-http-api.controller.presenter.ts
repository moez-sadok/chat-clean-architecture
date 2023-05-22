// import { Controller,Get,HttpStatus,Inject,Param, Query, Res} from '@nestjs/common';
// import { Response } from 'express';
// import { IChatControllerInputBoundary, IChatPresenterOutputBoundary } from '@chat-clean-architecture/chat/application-business-rules/interactor';

// //NOT used yet (on cheking ... cqrs/ full ws )
// /* SECOND solution - controller use the presenter (see clean architecture page 72) to contunie cheking */

// //https://softwareengineering.stackexchange.com/questions/357052/clean-architecture-use-case-containing-the-presenter-or-returning-data
// //https://stackoverflow.com/questions/70913826/clean-architecture-can-the-preseter-talk-to-to-the-controller
// //Temp solution (not recomded using controller with presenter see also :
// //https://softwareengineering.stackexchange.com/questions/357052/clean-architecture-use-case-containing-the-presenter-or-returning-data


// @Controller()
// export class ChatHttpApiadApterController {//extends ChatControllerMemoryImpl  //implements IChatController (to create an adapter )

//   constructor(
//     @Inject('CHAT_INTERACTOR_PROVIDER') private readonly interactor : IChatControllerInputBoundary,
//     @Inject('CHAT_PRESENTATOR_PROVIDER') private readonly presenter : IChatPresenterOutputBoundary,
//    ) {}

//   @Get('chat-user-rooms/:userId')
//   async getUserRoomsView(@Param() params: any, @Res() res: Response): Promise<void> {
//     const resData = await this.interactor.getRoomsByUser({userId:+params.userId});
//     const resPresentedData = this.presenter.selectedRoomsByUser(resData);
//     res.status(HttpStatus.OK).json(resPresentedData); 
//   }

//   @Get('chat-room-messages/:roomId')
//   async getRoomMessagesView(@Query() query:any, @Res() res: Response ): Promise<void> {
//     const resData = await this.interactor.getChatRoomsMessages(
//       {userId:query.userId,roomId: query.roomId, roomName: query.roomName }
//       );
//     const resPresentedData = this.presenter.selectChatRoomsMessages(resData, {roomId:query.roomId, roomName: query.roomName });
//     res.status(HttpStatus.OK).json(resPresentedData); 
//   }

// }

