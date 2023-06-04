import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MultiUsersChatPageComponent } from './pages/multi-users-chat-page/multi-users-chat-page.component';
import { ChatPageWsHttpClientComponent } from './pages/chat-page/chat-page.component-ws-client';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'multi' },
  { path: 'multi', component: MultiUsersChatPageComponent },
  { path: 'user/:userId', component: ChatPageWsHttpClientComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatClientRoutingNgModule {}
