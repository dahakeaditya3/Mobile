import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICustomer } from '../../models/interface/customer.interface';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
  customer: ICustomer | null = null;
  updateMode = false;
  customerForm!: FormGroup;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    const customerData = storedUser ? JSON.parse(storedUser) : null;

    if (!customerData || !customerData.customerId) {
      this.router.navigate(['/login']);
    } else {
      this.loadCustomer(customerData.customerId);
    }
  }

  loadCustomer(id: number) {
    this.customerService.getCustomerById(id).subscribe({
      next: (data) => {
        this.customer = data;
        this.buildForm();
      },
      error: (err) => console.error('Error loading customer:', err)
    });
  }

  buildForm() {
    if (!this.customer) return;

    this.customerForm = this.fb.group({
      customerName: [this.customer.customerName, Validators.required],
      email: [this.customer.email, [Validators.required, Validators.email]],
      phoneNo: [this.customer.phoneNo, Validators.required],
      city: [this.customer.city, Validators.required],
      gender: [this.customer.gender, Validators.required]
    });
  }

  enableUpdate() {
    this.updateMode = true;
  }

  // saveProfile() {
  //   if (!this.customerForm.valid || !this.customer) return;

  //   const updatedCustomer: ICustomer = { ...this.customer, ...this.customerForm.value };

  //   this.customerService.updateCustomer(updatedCustomer).subscribe({
  //     next: (res) => {
  //       this.customer = res;
  //       this.updateMode = false;
  //     },
  //     error: (err) => console.error('Error updating profile:', err)
  //   });
  // }

  cancelUpdate() {
    this.updateMode = false;
    this.buildForm();
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/home']);
  }
}
