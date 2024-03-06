import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatPageTcpClientComponent } from './chat-page/chat-page.component-tcp-client';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'chat' },
  { path: 'user/:userId',component: ChatPageTcpClientComponent
    // loadChildren: () =>
    //   import('@chat-clean-architecture/chat/frameworks/ui/angular/rooms').then(
    //     (m) => m.ChatClientNgModule
    //   ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
