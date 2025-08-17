import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SellerService } from '../../services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './seller-register.component.html',
  styleUrls: ['./seller-register.component.css']
})
export class SellerRegisterComponent implements OnInit {
  sellerForm!: FormGroup;

  router = inject(Router);

  constructor(private fb: FormBuilder, private sellerService: SellerService) { }

  ngOnInit(): void {
    this.sellerForm = this.fb.group({
      sname: ['', Validators.required],
      sphone_no: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      sgender: ['', Validators.required],
      scompany_name: ['', Validators.required],
      s_email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.sellerForm.valid) {
      const newSeller = {
        seller_id: Date.now(),   // Auto generated seller_id
        ...this.sellerForm.value
      };

      this.sellerService.registerSeller(newSeller).subscribe(() => {
        alert('Seller registered successfully');
        this.router.navigateByUrl("login")
        this.sellerForm.reset();
      });
    } else {
      alert('Please fill all required fields');
    }
  }
}
