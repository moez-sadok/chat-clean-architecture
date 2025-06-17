import { Body, Controller, Get, Inject, Optional, Param, Post, Query } from '@nestjs/common';
import { GetMessagesByRoomFeature, GetRoomsByUserFeature, GetUserByIdFeature, SendMessageFeature } from '@cca/core-features';
import { IChatHttpController } from '@cca/core-controllers';
@Controller()
export class ChatHttpAdapterController implements IChatHttpController {

  constructor(
    // @Optional() @Inject('GET_ROOMS_ByUserFeature') private getRoomsByUserFeature: GetRoomsByUserFeature,
    @Optional() @Inject('GET_USER_ByIdFeature') private getUserByIdFeature: GetUserByIdFeature,
    @Optional() @Inject('GET_MESSAGES_ByRoomFeature') private getMessagesByRoomFeature: GetMessagesByRoomFeature,
    @Optional() @Inject('SEND_MESSAGE_Feature') private sendMessageFeature: SendMessageFeature
  ) { }

  // @Get('chat-user-rooms/:userId')
  // getUserRooms(@Param() params: any) {
  //   return this.getRoomsByUserFeature.getRoomsByUser({ userId: +params.userId });
  // }

  @Get('chat-user/:userId')
  getUserById(@Param() params: any) {
    return this.getUserByIdFeature.getUser(+params.userId);
  }

  // @Get('chat-room-messages')
  // getRoomMessages(@Query() query: any) {
  //   //+query.userId
  //   return this.getMessagesByRoomFeature.getChatRoomsMessages({ roomId: +query.roomId });
  // }

  @Post('send-message')
  sendMessage(@Body() message: any) {
    return this.sendMessageFeature.sendMessage({ roomId: +message.roomId, userId: +message.userId, message: message.message });
  }

}
