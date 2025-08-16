import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seller-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './seller-profile.component.html'
})
export class SellerProfileComponent implements OnInit {
  seller: any;
  showAddProductForm = false;
  showProducts = false;
  productForm!: FormGroup;
  sellerProducts: any[] = [];
  selectedFiles: any = {}; // store filenames only

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.seller = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (!this.seller || !this.seller.seller_id) {
      this.router.navigate(['/']);
    }

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      company: ['', Validators.required],
      image1: [''],
      image2: [''],
      image3: [''],
      image4: ['']
    });
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/']);
  }

  // Handle file selection and store only filenames
  onFileSelected(event: any, field: string) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFiles[field] = file.name;
      // Optional: show a preview if you want
    }
  }

  addProduct() {
    if (this.productForm.valid) {
      const newProduct = {
        products_id: Date.now(),
        seller_id: this.seller.seller_id,
        ...this.productForm.value,
        image1: this.selectedFiles.image1 || '',
        image2: this.selectedFiles.image2 || '',
        image3: this.selectedFiles.image3 || '',
        image4: this.selectedFiles.image4 || ''
      };

      this.http.post('http://localhost:3000/products', newProduct).subscribe(() => {
        alert('Product added successfully!');
        this.productForm.reset();
        this.selectedFiles = {};
        this.showAddProductForm = false;
        if (this.showProducts) this.loadSellerProducts();
      });
    } else {
      alert('Please fill all required fields!');
    }
  }

  toggleShowProducts() {
    this.showProducts = !this.showProducts;
    if (this.showProducts) this.loadSellerProducts();
  }

  loadSellerProducts() {
    this.http.get<any[]>('http://localhost:3000/products').subscribe((products) => {
      this.sellerProducts = products.filter(p => p.seller_id === this.seller.seller_id);
    });
  }

  deleteProduct(productId: number) {
    if (confirm('Are you sure this product is sold?')) {
      this.http.delete(`http://localhost:3000/products/${productId}`).subscribe(() => {
        alert('Product deleted successfully!');
        this.loadSellerProducts();
      });
    }
  }
}
