import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router) { }

  login() {
    if (this.username && this.password) {
      if (this.username.includes('seller')) {
        this.router.navigate(['/seller-profile']);
      } else {
        this.router.navigate(['/user-profile']);
      }
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  forgotPassword() {
    alert('Forgot password flow here.');
  }
}
