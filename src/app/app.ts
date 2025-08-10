import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ngx-seed-mfe',
  imports: [MatButtonModule],
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <a mat-flat-button>Angular Material Installed</a>
  `,
  styles: [],
})
export class App {
  protected title = 'ngx-seed-mfe';
}

// 👇 **IMPORTANT FOR DYMANIC LOADING**
export default App;
