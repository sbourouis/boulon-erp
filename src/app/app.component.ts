import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-header></app-header>
  <div class="container">
    <div class="row" >
        <router-outlet></router-outlet>
    </div>
  </div>
`,
  styles: [``]
})
export class AppComponent {
  title = 'app';
}
