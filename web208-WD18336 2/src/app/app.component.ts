import { Component } from '@angular/core';
import { IProduct } from './interface/product';
import { IStudent } from './interface/student';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'web208';
}
