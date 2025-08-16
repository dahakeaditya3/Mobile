import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
  customer: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.customer = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (!this.customer || !this.customer.customer_id) {
      this.router.navigate(['/']); // redirect if not logged in
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/']);
  }
}
