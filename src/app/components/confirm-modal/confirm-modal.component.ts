import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  visible = false;
  message = 'Are you sure?';

  open(message: string = 'Are you sure?') {
    this.message = message;
    this.visible = true;
  }

  confirm() {
    this.onConfirm.emit();
    this.visible = false;
  }

  cancel() {
    this.onCancel.emit();
    this.visible = false;
  }
}
