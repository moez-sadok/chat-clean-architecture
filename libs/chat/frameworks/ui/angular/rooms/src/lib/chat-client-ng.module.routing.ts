import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatPageWsHttpClientComponent } from './pages/chat-page/chat-page.component-ws-client';

//import { MultiUsersChatPageComponent } from './pages/multi-users-chat-page/multi-users-chat-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'multi' },
  { path: 'user/:userId', component: ChatPageWsHttpClientComponent }
  // { path: 'multi', component: MultiUsersChatPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatClientRoutingNgModule { }
