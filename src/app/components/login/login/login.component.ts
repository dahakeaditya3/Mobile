import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password, role } = this.loginForm.value;

      // Choose API endpoint based on role
      const apiUrl = role === 'customer'
        ? 'https://localhost:7125/api/Customer/GetAllCustomers'
        : 'https://localhost:7125/api/Seller/GetAllSellers';

      this.http.get<any[]>(`${apiUrl}?email=${email}&password=${password}`)
        .subscribe((res) => {
          if (res.length > 0) {
            const user = res[0];
            localStorage.setItem('loggedInUser', JSON.stringify(user)); // store user
            alert(`${role} login successful!`);

            if (role === 'customer') {
              this.router.navigate(['/dashboard']);

            } else {
              this.router.navigate(['/sellerprofile']);
            }
          } else {
            alert('Invalid email or password');
          }
        });
    }
  }

  onForgotPassword() {
    alert('Redirecting to Forgot Password Page...');
    this.router.navigate(['/forgot-password']);
  }

  onCreateCustomer() {
    this.router.navigate(['/register']);  // customer register page
  }

  onCreateSeller() {
    this.router.navigate(['/seller-register']);  // seller register page
  }

}
