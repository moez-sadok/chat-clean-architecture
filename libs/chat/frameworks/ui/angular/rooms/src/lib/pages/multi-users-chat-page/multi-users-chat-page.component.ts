import { Component } from '@angular/core';
import { DataBaseMemoryImpl } from '@chat-clean-architecture/chat/frameworks/db/in-memory-db';
import { CHAT_DB_PROVIDER, CHAT_DB_MAPPER_PROVIDER, dbMapperFactory, CHAT_SERVER_PROVIDER_PORT, chatServerFactory } from '../../services/main-chat-front-provider';

@Component({
  selector: 'cca-multi-users-chat-page',
  templateUrl: './multi-users-chat-page.component.html',
  providers: [
    // Version 1: Full In memory main components injections 
    { provide: CHAT_DB_PROVIDER, useClass: DataBaseMemoryImpl },
    {
      provide: CHAT_DB_MAPPER_PROVIDER, useFactory: dbMapperFactory,
      deps: [CHAT_DB_PROVIDER]
    },
    {
      provide: CHAT_SERVER_PROVIDER_PORT, useFactory: chatServerFactory,
      deps: [CHAT_DB_MAPPER_PROVIDER]
    },
  ]
})
export class MultiUsersChatPageComponent {

  userIds: number[] = [1, 2, 3, 4]

}
