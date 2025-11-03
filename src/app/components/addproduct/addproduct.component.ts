import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductCreate } from '../../models/product';
import { SellerNavComponent } from "../seller-nav/seller-nav.component";
import { ToastComponent } from '../ReusebleComponent/toast/toast.component';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SellerNavComponent, ToastComponent],
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddProductComponent {
  productForm!: FormGroup;

  @ViewChild('toast') toast!: ToastComponent;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastService: ToastService
  ) {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3)]],
      productCompany: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      model: ['', [Validators.required]],
      originalPrice: ['', [Validators.required, Validators.min(1)]],
      condition: ['', [Validators.required]],
      color: ['', [Validators.required]],
      ram: [''],
      storage: [''],
      displaySize: [''],
      batteryCapacity: [''],
      camera: [''],
      operatingSystem: ['', [Validators.required]],
      network: ['', [Validators.required]],
      warranty: [''],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image1: [null, [Validators.required]],
      image2: [null],
      image3: [null],
      image4: [null]
    });
  }

  onFileSelected(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      this.productForm.get(controlName)?.setValue(event.target.files[0]);
    }
  }

  submit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const sellerId = Number(localStorage.getItem('userId'));
    const product: ProductCreate = {
      ...this.productForm.value,
      sellerId
    };

    this.productService.addProduct(product).subscribe({
      next: (id) => {
        this.toastService.show(`Product added successfully with ID: ${id}`, 'success');
        this.productForm.reset();
      },
      error: (err) => {
        console.error('Error adding product:', err);
        this.toastService.show('Failed to add product', 'error');
      }
    });
  }
}
