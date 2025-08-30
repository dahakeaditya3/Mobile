import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CustomerService } from './../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  router = inject(Router);

  constructor(private fb: FormBuilder, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      customerName: ['', Validators.required],
      phoneNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      passwordHash: ['', Validators.required],
      confirmPasswordHash: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.customerService.registerCustomer(this.registerForm.value).subscribe(() => {
        alert('Customer registered successfully');
        this.router.navigateByUrl("login");
        this.registerForm.reset();
      });
    } else {
      alert('Please fill all required fields');
    }
  }

  goTologin() {
    this.router.navigate(['login']);
  }
}
