import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  visible = false;
  message = '';
  type: 'success' | 'error' | 'warning' | 'info' = 'success';

  get toastClass() {
    return {
      'toast-success': this.type === 'success',
      'toast-error': this.type === 'error',
      'toast-warning': this.type === 'warning',
      'toast-info': this.type === 'info'
    };
  }

  get toastIcon() {
    switch (this.type) {
      case 'success': return 'bi bi-check-circle-fill';
      case 'error': return 'bi bi-x-circle-fill';
      case 'warning': return 'bi bi-exclamation-triangle-fill';
      case 'info': return 'bi bi-info-circle-fill';
      default: return 'bi bi-bell-fill';
    }
  }

  show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') {
    this.message = message;
    this.type = type;
    this.visible = true;
    setTimeout(() => this.visible = false, 1000);
  }
}
