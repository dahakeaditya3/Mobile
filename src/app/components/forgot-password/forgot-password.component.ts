import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  step: 'email' | 'otp' | 'reset' = 'email';
  email = '';
  role = 'Customer';
  otp = '';
  newPassword = '';
  confirmPassword = '';
  message = '';
  isLoading = false;

  constructor(private http: HttpClient, private router: Router) {}

  sendOtp() {
    this.isLoading = true;
    this.http.post<any>('https://localhost:7011/api/ForgotPassword/send-otp', {
      email: this.email,
      role: this.role
    }).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.message = 'OTP sent successfully. Check your email.';
        this.step = 'otp';
      },
      error: (err) => {
        this.isLoading = false;
        this.message = err.error?.message || 'Email not found.';
      }
    });
  }

  verifyOtp() {
    this.isLoading = true;
    this.http.post<any>('https://localhost:7011/api/ForgotPassword/verify-otp', {
      email: this.email,
      otp: this.otp
    }).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.message = 'OTP verified successfully.';
        this.step = 'reset';
      },
      error: (err) => {
        this.isLoading = false;
        this.message = err.error?.message || 'Invalid OTP.';
      }
    });
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Passwords do not match!';
      return;
    }

    this.isLoading = true;
    this.http.post<any>('https://localhost:7011/api/ForgotPassword/reset-password', {
      email: this.email,
      role: this.role,
      newPassword: this.newPassword
    }).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.message = 'Password changed successfully! Redirecting...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.message = err.error?.message || 'Failed to reset password.';
      }
    });
  }
}
