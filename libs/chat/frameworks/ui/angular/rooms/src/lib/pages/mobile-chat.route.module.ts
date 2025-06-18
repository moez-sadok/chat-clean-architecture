import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileChatMessagePageComponent } from './mobile-chat-message-page/mobile-chat-message-page.component';
import { MobileChatRoomsPageComponent } from './mobile-chat-rooms-page/mobile-chat-rooms-page.component';

const routes: Routes = [
  { path: ':userId', component: MobileChatRoomsPageComponent },
  { path: ':userId/:roomId', component: MobileChatMessagePageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MobileChatRouteModule {}
