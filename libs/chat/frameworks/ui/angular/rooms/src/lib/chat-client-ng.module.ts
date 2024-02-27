import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { ChatViewComponent } from './components/chat-view/chat-view.component';
import { ChatClientRoutingNgModule } from './chat-client-ng.module.routing';
import { HttpClientModule } from '@angular/common/http';
import { MultiUsersChatPageComponent } from './pages/multi-users-chat-page/multi-users-chat-page.component';
//
import { ChatPageWsHttpClientComponent } from './pages/chat-page/chat-page.component-ws-client';
import { ChatViewMaterialComponent } from './components/chat-view/chat-view.material.component';

@NgModule({
  declarations: [
    ChatPageComponent, 
    ChatViewComponent,
    MultiUsersChatPageComponent,
    ChatPageWsHttpClientComponent
  ],
  imports: [
    CommonModule,
    ChatClientRoutingNgModule,
    HttpClientModule,
    ChatViewMaterialComponent,// comment me for native html use (save 2 mb)
  ]
})
export class ChatClientNgModule {}
