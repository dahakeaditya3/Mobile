import { Injectable } from '@angular/core';
import { ToastComponent } from '../components/ReusebleComponent/toast/toast.component';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastComponent?: ToastComponent;

  register(toast: ToastComponent) {
    this.toastComponent = toast;
  }

  show(message: string, type: 'success' | 'error' = 'success' ) {
    this.toastComponent?.show(message, type);
  }
}
