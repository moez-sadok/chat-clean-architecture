import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatPageComponent } from './containers/chat-page/chat-page.component';
import { MultiUsersChatPageComponent } from './containers/multi-users-chat-page/multi-users-chat-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'multi' },
  { path: 'multi', component: MultiUsersChatPageComponent },
  { path: 'user/:userId', component: ChatPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatClientRoutingNgModule {}
