# Chat Clean Architecture

✨ ** Example of chat application using clean architecture using Typescript and Nx workspace and tested with many frameworks/libs as: In memory, Angular, React, NestJs, GraphQl, Mongo, Redis, Websocket ...) ** ✨

## Demo (in memory angular app as a main) 

https://stackblitz.com/github/moez-sadok/chat-clean-architecture

## Run in localhost
npm i
npm run start:ng
npm run start:api

install redis (check official redis website and see also https://docs.nestjs.com/websockets/adapter)
run redis using cli command: redis-server

## Try with 2 versions
Version 1: Full in memory angular app as main
http://localhost:4200/chat/multi

Version 2:With client/server (websockt) , open different private tabs 
http://localhost:4200/chat/user/1
http://localhost:4200/chat/user/2

## Using nx to show the dependencies graph
npm run dep-graph

## Code scaffolding 

Generate nest app:
npx nx generate @nrwl/nest:application chat/chat-server-main-api --frontendProject chat-chat-client-main-ng