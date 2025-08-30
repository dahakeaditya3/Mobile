import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISeller } from '../../models/interface/seller.interface';
import { SellerService } from '../../services/seller.service';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/interface/products.interface';

@Component({
  selector: 'app-seller-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './seller-profile.component.html',
  // styleUrls: ['./seller-profile.component.css']
})
export class SellerProfileComponent implements OnInit {
  seller: ISeller | null = null;
  updateMode = false;
  sellerForm!: FormGroup;
  showProducts = false;
  sellerProducts: IProduct[] = [];

  constructor(
    private sellerService: SellerService,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    const sellerData = storedUser ? JSON.parse(storedUser) : null;

    if (!sellerData || !sellerData.sellerId) {
      this.router.navigate(['/login']);
    } else {
      this.loadSeller(sellerData.sellerId);
    }
  }

  loadSeller(id: number) {
    this.sellerService.getSellerById(id).subscribe({
      next: (data) => {
        this.seller = data;
        this.buildForm();
      },
      error: (err) => console.error('Error loading seller:', err)
    });
  }

  buildForm() {
    if (!this.seller) return;
    this.sellerForm = this.fb.group({
      sellerName: [this.seller.sellerName, Validators.required],
      storeName: [this.seller.storeName, Validators.required],
      email: [this.seller.email, [Validators.required, Validators.email]],
      phoneNo: [this.seller.phoneNo, Validators.required],
      state: [this.seller.state],
      city: [this.seller.city],
      address: [this.seller.address]
    });
  }

  enableUpdate() {
    this.updateMode = true;
  }

  saveProfile() {
    if (this.sellerForm.invalid || !this.seller) return;
    const updatedSeller = { ...this.seller, ...this.sellerForm.value };
    this.sellerService.updateSellerById(this.seller.sellerId, updatedSeller).subscribe({
      next: (res) => {
        this.seller = res;
        this.updateMode = false;
      },
      error: (err) => console.error('Error updating profile:', err)
    });
  }

  cancelUpdate() {
    this.updateMode = false;
    this.buildForm();
  }

  goToChangePassword() {
    this.router.navigate(['/seller/change-password']);
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/home']);
  }

  // =========================
  // Products logic
  // =========================
  toggleShowProducts() {
    this.showProducts = !this.showProducts;
    if (this.showProducts && this.seller) {
      this.loadSellerProducts(this.seller.sellerId);
    }
  }

  loadSellerProducts(sellerId: number) {
    this.productService.GetProductsBySeller(sellerId).subscribe({
      next: (products) => this.sellerProducts = products,
      error: (err) => console.error('Failed to load products:', err)
    });
  }

  deleteProduct(productId: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        alert('Product deleted successfully!');
        // Remove deleted product from the local array
        this.sellerProducts = this.sellerProducts.filter(p => p.productId !== productId);
      },
      error: (err) => {
        console.error('Delete failed:', err);
        alert('Failed to delete product.');
      }
    });
  }
}
