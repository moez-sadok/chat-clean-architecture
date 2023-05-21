import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPageComponent } from './containers/chat-page/chat-page.component';
import { ChatViewComponent } from './components/chat-view/chat-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChatClientRoutingNgModule } from './chat-client-ng.module.routing';
import { HttpClientModule } from '@angular/common/http';
import { MultiUsersChatPageComponent } from './containers/multi-users-chat-page/multi-users-chat-page.component';
//
import { DataBaseMemoryImpl } from '@chat-clean-architecture/chat/frameworks/db/in-memory-db';
import { CHAT_DB_PROVIDER, CHAT_DB_MAPPER_PROVIDER, dbMapperFactory, CHAT_SERVER_PROVIDER, chatServerFactory } from './services/main-chat-front-provider';
import { ChatPageWsHttpClientComponent } from './containers/chat-page/chat-page.component-ws-client';

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
    //material components
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule,
    //
  ],
  providers: [
    //Version 1: Full In memory main components injections 
    { provide: CHAT_DB_PROVIDER, useClass: DataBaseMemoryImpl },
    {
      provide: CHAT_DB_MAPPER_PROVIDER, useFactory: dbMapperFactory,
      deps: [CHAT_DB_PROVIDER]
    },
    {
      provide: CHAT_SERVER_PROVIDER, useFactory: chatServerFactory,
      deps: [CHAT_DB_MAPPER_PROVIDER]
    },
  ]
})
export class ChatClientNgModule {}
