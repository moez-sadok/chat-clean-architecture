import { Component } from '@angular/core';

@Component({
  selector: 'cca-multi-users-chat-page',
  templateUrl: './multi-users-chat-page.component.html',
  //defined inside the module to use page by id also  
  //providers: [
  //   { provide: CHAT_DB_PROVIDER, useClass: DataBaseMemoryImpl },
  //   {
  //     provide: CHAT_DB_MAPPER_PROVIDER, useFactory: dbMapperFactory,
  //     deps: [CHAT_DB_PROVIDER]
  //   },
  //   {
  //     provide: CHAT_SERVER_PROVIDER, useFactory: chatServerFactory,
  //     deps: [CHAT_DB_MAPPER_PROVIDER]
  //   },
  // ]
})
export class MultiUsersChatPageComponent {

  userIds: number[] = [1, 2, 3, 4]

}
