import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ChatPageTcpClientComponent } from './chat-page/chat-page.component-tcp-client';
import { ChatPageComponent, ChatViewComponent, ChatViewMaterialComponent } from '@chat-clean-architecture/chat/frameworks/ui/angular/rooms';

@NgModule({
  declarations: [
    AppComponent, 
    // ChatPageTcpClientComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    BrowserAnimationsModule,
    //
    ChatViewComponent,
    ChatPageComponent,
    ChatViewMaterialComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
