import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPageComponent } from './chat-page/chat-page.component';

const routes: Routes = [
  { path: ':userId', component: ChatPageComponent, pathMatch: 'full' },
  { path: ':userId/:roomId', component: ChatPageComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class WebChatRouteModule {}
