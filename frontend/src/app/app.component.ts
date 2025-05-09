import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],  // Import RouterModule for routing
  template: `
    <router-outlet></router-outlet>  <!-- This is where routed components will appear -->
  `,
})
export class AppComponent {}
