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
  type: 'success' | 'error' | 'warning' = 'success';

  show(message: string, type: 'success' | 'error' | 'warning' = 'success') {
    this.message = message;
    this.type = type;
    this.visible = true;

    setTimeout(() => this.visible = false, 500);
  }
}
