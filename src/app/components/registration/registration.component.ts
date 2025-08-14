import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  name = '';
  email = '';
  password = '';
  type = 'user'; // default

  constructor(private router: Router) { }

  register() {
    // Here you would call json-server API to store in users or seller
    if (this.type === 'seller') {
      alert('Seller registered successfully!');
    } else {
      alert('User registered successfully!');
    }
    this.router.navigate(['/login']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
