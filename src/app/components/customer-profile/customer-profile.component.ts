import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CustomerNavComponent } from "../customer-nav/customer-nav.component";

@Component({
  selector: 'app-seller-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomerNavComponent],
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  customerForm!: FormGroup;
  isEditing = false;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) { this.router.navigate(['/login']); return; }

    this.customerService.getProfile(userId).subscribe(res => {
      this.customerForm = this.fb.group({
        customerName: [res.customerName],
        email: [res.email],
        contact: [res.contact],
        gender: [res.gender],
        city: [res.city],
        creadedOn: [res.createdOn],
        profilePictureUrl: [res.profilePictureUrl]
      });
    });
  }

  toggleEdit() { this.isEditing = !this.isEditing; }

  updateProfile() {
    if (!this.customerForm.valid) return;
    const updated = this.customerForm.value;
    const userId = Number(localStorage.getItem('userId'));
    this.customerService.updateProfile({ ...updated, customerId: userId }).subscribe(() => this.isEditing = false);
  }

  onFileSelected(event: any) {
    if (!event.target.files || event.target.files.length === 0) return;
    const file: File = event.target.files[0];

    this.customerService.uploadProfilePicture(file).subscribe(res => {
      this.customerForm.patchValue({ profilePictureUrl: res.fileUrl });
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
