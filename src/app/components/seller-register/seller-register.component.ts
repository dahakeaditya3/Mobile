import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { SellerService } from './../../services/seller.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './seller-register.component.html',
  styleUrls: ['./seller-register.component.css']
})
export class SellerRegisterComponent implements OnInit {
  sellerRegisterForm!: FormGroup;
  router = inject(Router);

  constructor(private fb: FormBuilder, private SellerService: SellerService) { }

  ngOnInit(): void {
    this.sellerRegisterForm = this.fb.group({
      sellerName: ['', Validators.required],
      storeName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      passwordHash: ['', Validators.required],
      confirmPasswordHash: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.sellerRegisterForm.valid) {
      this.SellerService.registerSeller(this.sellerRegisterForm.value).subscribe(() => {
        alert('Seller registered successfully');
        this.router.navigateByUrl("login");
        this.sellerRegisterForm.reset();
      });
    } else {
      alert('Please fill all required fields');
    }
  }

  goTologin() {
    this.router.navigate(['login']);
  }
}
