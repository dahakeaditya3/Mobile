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
  targetProductId?: number;

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
    this.targetProductId = id;
    this.confirmModal.open('Are you sure you want to delete this product?');
  }

  onConfirmDelete() {
    if (!this.targetProductId) return;

    this.loading = true;
    this.productService.updateStatus(this.targetProductId, false).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.productId !== this.targetProductId);
        this.toastService.show('Product deleted successfully', 'success');
        this.targetProductId = undefined;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastService.show('Failed to delete product', 'error');
        this.loading = false;
      }
    });
  }

  onCancelDelete() {
    this.targetProductId = undefined;
  }
}
