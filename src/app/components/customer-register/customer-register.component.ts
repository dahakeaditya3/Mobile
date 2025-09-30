import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        customerName: ['', [Validators.required]],   // 👈 FIXED
        email: ['', [Validators.required, Validators.email]],
        contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        gender: ['', Validators.required],
        city: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: this.passwordMatchValidator('password', 'confirmPassword')
      }
    );
  }

  passwordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passControl = formGroup.get(password);
      const confirmControl = formGroup.get(confirmPassword);

      if (!passControl || !confirmControl) return null;

      if (confirmControl.errors && !confirmControl.errors['passwordMismatch']) {
        return null;
      }

      if (passControl.value !== confirmControl.value) {
        confirmControl.setErrors({ passwordMismatch: true });
      } else {
        confirmControl.setErrors(null);
      }

      return null;
    };
  }


  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.registerForm.invalid) return;

    const customerData = {
      customerName: this.registerForm.value.customerName, // 👈 FIXED
      email: this.registerForm.value.email,
      contact: this.registerForm.value.contact,
      gender: this.registerForm.value.gender,
      city: this.registerForm.value.city,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      createdOn: new Date()
    };


    this.http.post('https://localhost:7087/api/Customers', customerData)
      .subscribe({
        next: () => {
          alert(this.successMessage = 'Registration successful 🎉');
          this.router.navigateByUrl('/login');
          this.registerForm.reset();
          this.submitted = false;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Something went wrong. Try again!';
        }
      });
  }
}
