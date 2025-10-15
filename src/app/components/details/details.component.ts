import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product';
import { CustomerNavComponent } from "../customer-nav/customer-nav.component";
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ICartItemCreate } from '../../models/cart';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, CustomerNavComponent, FormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  product: IProduct | null = null;
  productId!: number;
  images: string[] = [];
  selectedImage: string = '';
  quantity: number = 1;
  totalPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      alert('Invalid product');
      this.router.navigate(['/main-page']);
      return;
    }

    this.productId = +idParam;
    this.loadProductDetails();
  }

  loadProductDetails() {
    this.productService.getById(this.productId).subscribe({
      next: (data) => {
        this.product = data;

        this.images = [
          data.image1Base64,
          data.image2Base64,
          data.image3Base64,
          data.image4Base64
        ]
          .filter(img => !!img)
          .map(img => 'data:image/png;base64,' + img);

        if (this.images.length > 0) {
          this.selectedImage = this.images[0];
        }

        this.updateTotal();
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.toast.show('Product not found', 'error');
        this.router.navigate(['/main-page']);
      }
    });
  }

  increaseQuantity() {
    this.quantity++;
    this.updateTotal();
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateTotal();
    }
  }

  updateTotal() {
    if (!this.product) return;
    if (this.quantity < 1) this.quantity = 1;
    this.totalPrice = this.product.price * this.quantity;
  }

  buyNow() {
    if (!this.product) return;
    this.router.navigate(['/order', this.product.productId]);
  }

  addToCart() {
    if (!this.product) return;

    const customerId = Number(localStorage.getItem('userId'));
    if (!customerId || customerId === 0) {
      this.toast.show('Please login to add to cart', 'error');
      return;
    }

    const dto: ICartItemCreate = {
      customerId,
      productId: this.product.productId,
      // quantity: this.quantity
    };

    this.cartService.addToCart(dto).subscribe({
      next: () => {
        this.toast.show('Added to cart', 'success');
        this.router.navigate(['/cart']); // Navigate to cart page
      },
      error: (err) => {
        console.error(err);
        this.toast.show('Failed to add to cart', 'error');
      }
    });
  }
}
