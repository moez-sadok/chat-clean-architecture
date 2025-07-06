import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent, pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () => import('@cca/frameworks/ui/angular/rooms').then(m => m.WebChatRouteModule),
  },
  {
    path: 'mobile/user',
    loadChildren: () => import('@cca/frameworks/ui/angular/rooms').then(m => m.MobileChatRouteModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
