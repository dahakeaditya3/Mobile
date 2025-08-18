import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ICustomer } from './../../models/interface/customer.interface';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  customer!: ICustomer | null;
  isEditMode: boolean = false; // toggle for form

  constructor(private router: Router) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    this.customer = storedUser ? JSON.parse(storedUser) : null;

    if (!this.customer || !this.customer.customer_id) {
      this.router.navigate(['/']);
    }
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/']);
  }

  editProfile(): void {
    this.isEditMode = true;
  }

  saveProfile(): void {
    if (this.customer) {
      localStorage.setItem('loggedInUser', JSON.stringify(this.customer));
      this.isEditMode = false;
      alert('Profile updated successfully!');
    }
  }

  cancelEdit(): void {
    this.isEditMode = false;
    // reload from storage to discard unsaved changes
    const storedUser = localStorage.getItem('loggedInUser');
    this.customer = storedUser ? JSON.parse(storedUser) : null;
  }
}
