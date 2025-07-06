import { Module } from '@nestjs/common';
import { GetRoomsByUserMainProvidersModule } from './endpoints/get-rooms-by-user-endpoints/get-rooms-by-user.main.providers.module';
import { GetMessagesByRoomMainProvidersModule } from './endpoints/get-messages-by-room-endpoints/get-messages-by-room.main.providers.module';
import { GetUserByIdMainProvidersModule } from './endpoints/get-user-by-id-endpoints/get-user-by-id.main.providers.module';
import { SendMessageMainProvidersModule } from './endpoints/send-message-endpoints/send-message.main.providers.module';

@Module({
  imports: [
    GetRoomsByUserMainProvidersModule,
    GetMessagesByRoomMainProvidersModule,
    GetUserByIdMainProvidersModule,
    SendMessageMainProvidersModule
  ],
})
export class ChatApiModule { }
