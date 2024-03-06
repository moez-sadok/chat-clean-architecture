// import { Component} from '@angular/core';
// import { CHAT_CONTROLLER_PROVIDER, CHAT_DB_MAPPER_PROVIDER, CHAT_INTERACTOR_PROVIDER, CHAT_PRESENTATOR_PROVIDER, CHAT_SERVER_PROVIDER_PORT, CHAT_VIEW_PROVIDER, controllerMomoryFactory, interactorNetworkFactory, presenterFactory } from '../../services/main-chat-front-provider';
// import { UserWebViewClientImpl } from '@chat-clean-architecture/chat/adapters/views';
// import { ChatPageBaseComponent } from './chat-page.component.base';
// @Component({
//   selector: 'cca-chat-page',
//   templateUrl: './chat-page.component.html',
//   providers: [
//     { provide: CHAT_VIEW_PROVIDER, useClass: UserWebViewClientImpl },
//     {
//       provide: CHAT_PRESENTATOR_PROVIDER, useFactory: presenterFactory,
//       deps: [CHAT_VIEW_PROVIDER]
//     },
//     {
//       provide: CHAT_INTERACTOR_PROVIDER,
//       useFactory: interactorNetworkFactory,
//       deps: [CHAT_DB_MAPPER_PROVIDER, CHAT_PRESENTATOR_PROVIDER, CHAT_SERVER_PROVIDER_PORT]
//     },
//     {
//       provide: CHAT_CONTROLLER_PROVIDER,
//       useFactory: controllerMomoryFactory,
//       deps: [CHAT_INTERACTOR_PROVIDER,CHAT_PRESENTATOR_PROVIDER]
//     }
//   ]
// })
// export class ChatPageComponent extends ChatPageBaseComponent{}

