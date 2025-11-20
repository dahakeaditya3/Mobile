import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  step: number = 1;
  email: string = '';
  otp: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(private accountService: AccountService, private toast: ToastService, private router: Router) { }

  sendOtp() {
    console.log('Sending OTP to:', this.email);
    this.loading = true;
    this.accountService.sendOtp(this.email).subscribe({
      next: (res) => {
        console.log('Response:', res);
        this.toast.show('OTP sent to your email.', 'success');
        this.step = 2;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.toast.show('Email not found.', 'error');
        this.loading = false;
      }
    });
  }

  back(){
    this.router.navigateByUrl('/login');
  }


  verifyOtp() {
    if (!this.otp) {
      return;
    }
    this.loading = true;
    this.accountService.verifyOtp(this.email, this.otp).subscribe({
      next: () => {
        this.toast.show('OTP verified successfully.', 'success');
        this.step = 3;
        this.loading = false;
      },
      error: () => {
        this.toast.show('Invalid or expired OTP.', 'warning');
        this.loading = false;
      }
    });
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.toast.show('Passwords do not match.', 'warning');
      return;
    }
    this.loading = true;
    this.accountService.resetPassword(this.email, this.newPassword).subscribe({
      next: () => {
        this.toast.show('Password reset successfully. You can now log in.', 'success');
        this.step = 1;
        this.email = this.otp = this.newPassword = this.confirmPassword = '';
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: () => {
        this.toast.show('Failed to reset password.', 'error');
        this.loading = false;
      }
    });
  }
}
