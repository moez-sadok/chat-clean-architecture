import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatPageTcpClientComponent } from './chat-page/chat-page.component-tcp-client';

@NgModule({
  declarations: [AppComponent,ChatPageTcpClientComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
