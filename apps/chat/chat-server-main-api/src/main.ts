import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { RedisIoAdapter } from '@chat-clean-architecture/chat/frameworks/web/http-nest';
//import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //ws socket default adapter
  //app.useWebSocketAdapter(new WsAdapter(app));
  
  // redis ws adapter (install and run redis using cli command: redis-server)
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log( `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
