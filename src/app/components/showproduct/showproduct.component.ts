import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product';
import { SellerNavComponent } from "../seller-nav/seller-nav.component";

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [CommonModule, SellerNavComponent],
  templateUrl: './showproduct.component.html',
  styleUrls: ['./showproduct.component.css']
})
export class ShowProductsComponent implements OnInit {
  products: IProduct[] = [];
  error = '';
  loading = false;

  constructor(private productService: ProductService) {}

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

  delete(id: number) {
    if (confirm('Delete this product?')) {
      this.productService.delete(id).subscribe(() => this.products = this.products.filter(p => p.productId !== id));
    }
  }
}


