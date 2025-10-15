import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product';
import { SellerNavComponent } from "../seller-nav/seller-nav.component";
import { ToastComponent } from '../ReusebleComponent/toast/toast.component';
import { ToastService } from '../../services/toast.service';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [CommonModule, SellerNavComponent, ToastComponent, ConfirmModalComponent],
  templateUrl: './showproduct.component.html',
  styleUrls: ['./showproduct.component.css']
})
export class ShowProductsComponent implements OnInit {
  products: IProduct[] = [];
  error = '';
  loading = false;
  deletingId?: number;

  @ViewChild('toast') toast!: ToastComponent;
  @ViewChild('confirmModal') confirmModal!: ConfirmModalComponent;

  constructor(
    private productService: ProductService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadSellerProducts();
  }
  
  loadSellerProducts() {
    const sellerId = Number(localStorage.getItem('userId'));
    if (!sellerId) {
      this.error = 'Seller not logged in.';
      return;
    }

    this.loading = true;
    this.productService.getBySellerId(sellerId).subscribe({
      next: (res) => {
        this.products = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  promptDelete(id: number) {
    this.deletingId = id;
    this.confirmModal.open('Are you sure you want to delete this product?');
  }

  onConfirmDelete() {
    if (!this.deletingId) return;
    this.productService.delete(this.deletingId).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.productId !== this.deletingId);
        this.toastService.show('Product deleted successfully', 'success');
        this.deletingId = undefined;
      },
      error: (err) => {
        console.error(err);
        this.toastService.show('Failed to delete product', 'error');
      }
    });
  }

  onCancelDelete() {
    this.deletingId = undefined;
  }
}




// <app-seller-nav></app-seller-nav>
// <app-toast></app-toast>
// <app-confirm-modal #confirmModal (onConfirm)="onConfirmDelete()" (onCancel)="onCancelDelete()"></app-confirm-modal>

// <div class="container py-4">
//   <h2 class="mb-3">My Products</h2>

//   <div *ngIf="loading" class="text-center my-3">
//     <div class="spinner-border text-primary" role="status"></div>
//   </div>

//   <div *ngIf="error" class="alert alert-danger">{{ error }}</div>

//   <div *ngIf="!loading && products.length === 0 && !error" class="text-center py-5">
//     <img src="assets/images/empty-box.png" width="150" alt="No products" />
//     <h5 class="text-muted mt-3">No products found</h5>
//   </div>

//   <div class="row g-4" *ngIf="products.length > 0">
//     <div class="col-md-3 col-sm-6" *ngFor="let product of products">
//       <div class="card shadow-lg border-0 rounded-4 h-100">
//         <img *ngIf="product.image1Base64" [src]="'data:image/png;base64,'+product.image1Base64"
//           class="card-img-top rounded-top-4" alt="Mobile image" />
//         <div class="card-body">
//           <h6 class="text-secondary mb-1">{{product.productCompany}}</h6>
//           <h5 class="card-title fw-semibold">{{ product.productName }}</h5>
//           <p class="mb-1 text-muted small">{{product.ram}} | {{product.storage}} | {{product.color}}</p>
//           <p class="fw-bold text-success fs-5 mb-0">₹{{ product.price }}</p>
//           <p class="text-muted small mb-2">{{product.condition}}</p>
//           <button
//             class="btn btn-danger w-100"
//             [disabled]="loading && deletingId === product.productId"
//             (click)="promptDelete(product.productId)">
//             <ng-container *ngIf="!(loading && deletingId === product.productId)">Delete</ng-container>
//             <div *ngIf="loading && deletingId === product.productId" class="spinner-border spinner-border-sm"></div>
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
