import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { MultiUsersChatPageComponent } from './multi-users-chat-page/multi-users-chat-page.component';
import { ChatViewComponent, ChatViewMaterialComponent } from '@chat-clean-architecture/chat/frameworks/ui/angular/rooms';

@NgModule({
  declarations: [
    AppComponent, 
    ChatPageComponent, 
    MultiUsersChatPageComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    BrowserAnimationsModule,
    ChatViewComponent,
    ChatViewMaterialComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
