import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ngx-root',
  imports: [RouterOutlet, MatButtonModule],
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <a mat-flat-button >Testing</a>
    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected title = 'ngx-seed-mfe';
}
