import { ChatApiModule } from '@cca/frameworks/web/http-nest';
import { Module } from '@nestjs/common';

@Module({
  imports: [ChatApiModule]
})
export class AppModule {}
