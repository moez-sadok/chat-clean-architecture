import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('@chat-clean-architecture/chat/frameworks/ui/angular/rooms').then(m => m.WebChatRouteModule),
  },
  {
    path: 'mobile/user',
    loadChildren: () => import('@chat-clean-architecture/chat/frameworks/ui/angular/rooms').then(m => m.MobileChatRouteModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
