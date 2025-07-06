import { Component } from '@angular/core';

@Component({
  selector: 'cca-login',
  template: `
    <h2 class="padding-12">Select a sser to connect</h2>
    <ul>
      <li><a [routerLink]="['/user', 0]">Yuri</a></li><br>
      <li><a [routerLink]="['/user', 1]">Amelie</a></li><br>
      <li><a [routerLink]="['/user', 2]">Samir</a></li>
    </ul>
  `
})
export class LoginPageComponent {}
