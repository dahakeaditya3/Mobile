import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <h2>User Profile</h2>
      <pre>{{ user | json }}</pre>
    </div>
  `
})
export class UserProfileComponent {
  user: any;
  constructor(private router: Router) {
    this.user = this.router.getCurrentNavigation()?.extras.state?.['user'];
  }
}
