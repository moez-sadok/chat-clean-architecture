import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatPageComponent, GetRoomMessagesComponent, GetUserRoomsComponent } from '@chat-clean-architecture/chat/frameworks/ui/angular/rooms';

const routes: Routes = [
  // { path: 'user/:userId', component: ChatPageComponent, pathMatch: 'full' }
  { path: 'user/:userId', component: ChatPageComponent, pathMatch: 'full' },
  { path: 'user/:userId/:roomId', component: ChatPageComponent, pathMatch: 'full' },
  { path: 'mobile-user/:userId', component: GetUserRoomsComponent },
  //to fix (full independent as getUserRooms)
  // { path: 'mobile-user/:userId/:roomId', component: GetRoomMessagesComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
