import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatPageTcpClientComponent } from './chat-page/chat-page.component-tcp-client';

const routes: Routes = [
  { path: 'user/:userId', component: ChatPageTcpClientComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
