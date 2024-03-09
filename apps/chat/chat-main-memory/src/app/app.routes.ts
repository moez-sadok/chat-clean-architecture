import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MultiUsersChatPageComponent } from './multi-users-chat-page/multi-users-chat-page.component';

const routes: Routes = [
  { path: 'multi', component: MultiUsersChatPageComponent, pathMatch: 'full' },
  //  { path: '', pathMatch: 'full', redirectTo: 'chat' },
  // loadChildren: () =>
  //   import('@chat-clean-architecture/chat/frameworks/ui/angular/rooms').then(
  //     (m) => m.ChatClientNgModule
  //   ),
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
