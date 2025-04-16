//https://docs.nestjs.com/techniques/performance
import { FastifyAdapter, NestFastifyApplication, } from '@nestjs/platform-fastify'; 
import helmet from '@fastify/helmet'
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
// import { RedisIoAdapter } from '@chat-clean-architecture/chat/frameworks/web/http-nest';

async function bootstrap() {
  //use default nestjs : native express
  //const app = await NestFactory.create(AppModule); 
  //use fastify
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  //redis ws adapter (install and run redis using cli command: redis-server)
  // const redisIoAdapter = new RedisIoAdapter(app);
  // await redisIoAdapter.connectToRedis();
  // app.useWebSocketAdapter(redisIoAdapter);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  // await app.listen(port);
  await app.register(helmet); // fastify helmet security
  await app.listen(port, '0.0.0.0'); //for fastify
  
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();