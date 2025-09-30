import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductCreate } from '../../models/product';
import { SellerNavComponent } from "../seller-nav/seller-nav.component";

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SellerNavComponent],
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddProductComponent {
  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      productName: [''],
      productCompany: [''],
      price: [''],
      description: [''],
      image1: [null],
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
    const sellerId = Number(localStorage.getItem('userId'));
    const product: ProductCreate = {
      ...this.productForm.value,
      sellerId
    };

    this.productService.addProduct(product).subscribe({
      next: (id) => {
        alert('Product added successfully with ID: ' + id);
        this.productForm.reset();
      },
      error: (err) => console.error('Error adding product:', err)
    });
  }
}
