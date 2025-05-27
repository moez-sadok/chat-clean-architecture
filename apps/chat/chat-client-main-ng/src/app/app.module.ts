import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatPageComponent } from '@chat-clean-architecture/chat/frameworks/ui/angular/rooms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    BrowserAnimationsModule,
    //
    ChatPageComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
