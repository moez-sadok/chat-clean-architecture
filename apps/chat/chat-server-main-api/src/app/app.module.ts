import { ChatApiModule } from '@chat-clean-architecture/chat/frameworks/web/http-nest';
import { Module } from '@nestjs/common';

@Module({
  imports: [ChatApiModule]
})
export class AppModule {}
