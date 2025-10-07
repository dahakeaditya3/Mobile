import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, NavComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };

  submitForm() {
    console.log("Form Data: ", this.contactForm);
    alert('Message Sent Successfully!');
    this.contactForm = { firstName: '', lastName: '', email: '', phone: '', message: '' };
  }
}
