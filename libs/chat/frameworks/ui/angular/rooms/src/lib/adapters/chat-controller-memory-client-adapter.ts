// import { ChatControllerImpl } from '@chat-clean-architecture/chat/adapters/controllers';
// import { IChatAppFacadePresenterOutput, IChatClient, IChatAppFacadeControllerInput
// } from '@chat-clean-architecture/chat/application-business-rules/interactor';
// import { ChatClientPortImpl } from '@chat-clean-architecture/chat/adapters/network';
// // Adapter pattern (class) 
// export class ChatControllerMemoryClientAdapterImpl extends ChatControllerImpl {

//   constructor(
//     protected override interactorInputboundry: IChatAppFacadeControllerInput,
//     private presentator: IChatAppFacadePresenterOutput
//   ) {
//     super(interactorInputboundry);
//   }

//   override async connectClient(userId: number): Promise<boolean> {
//     //TO-CHECK
//     const existUser = await this.interactorInputboundry.getUser(userId);
//     if (!existUser) throw new Error('Not registerd user, disabled connection... ');
//     const client: IChatClient = new ChatClientPortImpl(existUser.id, existUser.name, this.presentator);
//     return this.interactorInputboundry.connectClient(client);
//   }

// }
