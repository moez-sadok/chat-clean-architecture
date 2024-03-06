import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatViewComponent } from './components/chat-view/chat-view.component';
import { ChatClientRoutingNgModule } from './chat-client-ng.module.routing';
import { HttpClientModule } from '@angular/common/http';
import { ChatPageWsHttpClientComponent } from './pages/chat-page/chat-page.component-ws-client';
import { ChatViewMaterialComponent } from './components/chat-view/chat-view.material.component';
import { ChatPageBaseComponent } from './pages/chat-page/chat-page.component.base';
// import { MultiUsersChatPageComponent } from './pages/multi-users-chat-page/multi-users-chat-page.component';
// import { ChatPageComponent } from './pages/chat-page/chat-page.component';
@NgModule({
  declarations: [
    //ChatPageComponent, 
    //MultiUsersChatPageComponent,
    ChatViewComponent,
    ChatPageWsHttpClientComponent,
    ChatPageBaseComponent
  ],
  imports: [
    CommonModule,
    ChatClientRoutingNgModule,
    HttpClientModule,
    ChatViewMaterialComponent,// comment me for native html use (save some mb)
  ],
  exports: [ChatPageBaseComponent]
})
export class ChatClientNgModule { }
