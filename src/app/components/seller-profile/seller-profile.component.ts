import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <h2>Seller Profile</h2>
      <pre>{{ seller | json }}</pre>
    </div>
  `
})
export class SellerProfileComponent {
  seller: any;
  constructor(private router: Router) {
    this.seller = this.router.getCurrentNavigation()?.extras.state?.['seller'];
  }
}
