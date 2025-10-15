import { Injectable } from '@angular/core';
import { ToastComponent } from '../components/ReusebleComponent/toast/toast.component';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastComponent?: ToastComponent;

  register(toast: ToastComponent) {
    this.toastComponent = toast;
  }

  show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') {
    this.toastComponent?.show(message, type);
  }

  showLoginSuccess(username: string) {
    this.show(`Welcome, ${username}! Logged in successfully.`, 'success');
  }

  showLogout(username: string) {
    this.show(`${username} logged out successfully.`, 'info');
  }

  showRegistrationSuccess(username: string) {
    this.show(`Account created for ${username}!`, 'success');
  }

  showError(message: string) {
    this.show(message, 'error');
  }
}
