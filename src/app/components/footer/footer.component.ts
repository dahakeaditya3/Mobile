import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  phoneNumber: string = '';

  requestCode() {
    if (this.phoneNumber) {
      alert(`Code requested for: ${this.phoneNumber}`);
    } else {
      alert('Please enter your phone number');
    }
  }
}
