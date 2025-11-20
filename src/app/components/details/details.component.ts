import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product';
import { CustomerNavComponent } from "../customer-nav/customer-nav.component";
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ICartItemCreate } from '../../models/cart';
import { ToastService } from '../../services/toast.service';
import { ProductRatingService } from '../../services/product-rating.service';
import { ProductRatingResponse } from '../../models/product-rating.model';

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
  relatedProducts: IProduct[] = [];
  deliveryDate: Date = new Date();
  customerId!: number;
  averageRating: number = 0;
  ratingCount: number = 0;
  stars = [1, 2, 3, 4, 5];
  Math = Math;
  reviews: ProductRatingResponse[] = [];
  showReviews = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private toast: ToastService,
    private ratingService: ProductRatingService
  ) { }

  ngOnInit(): void {
    this.customerId = Number(localStorage.getItem('userId'));
    const future = new Date();
    future.setDate(future.getDate() + 7);
    this.deliveryDate = future;
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.toast.show('Invalid product', 'error');
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

        this.selectedImage = this.images.length ? this.images[0] : '';
        // this.updateTotal();
        this.loadRelatedProducts();
        this.loadAverageRating();
        this.loadReviews();
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.toast.show('Product not found', 'error');
        this.router.navigate(['/main-page']);
      }
    });
  }

  loadAverageRating() {
    this.ratingService.getAverageRating(this.productId).subscribe({
      next: (avg) => {
        this.averageRating = avg;
      },
      error: (err) => console.error('Error loading rating:', err)
    });
  }


  loadRelatedProducts() {
    if (!this.product) return;

    this.productService.getAll().subscribe({
      next: (data) => {
        this.relatedProducts = data.filter(p =>
          p.productId !== this.product?.productId && (
            p.productCompany === this.product?.productCompany ||
            p.color === this.product?.color ||
            Math.abs(p.price - this.product!.price) <= 5000
          )
        ).slice(0, 8);
      },
      error: (err) => console.error('Error loading related products:', err)
    });
  }

  viewDetails(productId: number) {
    this.router.navigate(['/details', productId]).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.productId = productId;
      this.loadProductDetails();
    });
  }

  // updateTotal() {
  //   if (!this.product) return;
  //   if (this.quantity < 1) this.quantity = 1;
  //   this.totalPrice = this.product.price * this.quantity;
  // }

  buyNow() {
    if (!this.product) return;
    this.router.navigate(['/order', this.product.productId]);
  }

  addToCart() {
    if (!this.product) return;

    const customerId = Number(localStorage.getItem('userId'));
    if (!customerId) {
      this.toast.show('Please login to add to cart', 'error');
      return;
    }

    const dto: ICartItemCreate = { customerId, productId: this.product.productId };
    this.cartService.addToCart(dto).subscribe({
      next: () => {
        this.toast.show('Added to cart', 'success');
        this.router.navigate(['/cart']);
      },
      error: (err) => {
        console.error(err);
        this.toast.show('Failed to add to cart', 'error');
      }
    });
  }


  loadReviews() {
    this.ratingService.getRatings(this.productId).subscribe({
      next: (data) => {
        this.reviews = data,
          this.ratingCount = this.reviews.length
      },
      error: (err) => { console.error('Error loading reviews:', err) }
    });
  }

  showAllReviews = false;

  get visibleReviews() {
    return this.showAllReviews ? this.reviews : this.reviews.slice(0, 6);
  }

  toggleReviews() {
    this.showAllReviews = !this.showAllReviews;
  }
popupImage: string | null = null;

openPopup(img: string) {
  this.popupImage = img;
}

closePopup() {
  this.popupImage = null;
}

}
