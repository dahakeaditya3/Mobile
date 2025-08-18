import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../../services/product.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  product!: Product;
  showForm = false;
  customer = { name: '', phone: '', address: '' };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data) => this.product = data,
        error: (err) => console.error('Error fetching product:', err)
      });
    }
  }

  buyNow() {
    this.showForm = true;
  }

  submitOrder() {
    const today = new Date();
    const orderDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

    const newOrder = {
      productId: this.product.id,
      productName: this.product.name,
      price: this.product.price,
      images: [this.product.image1, this.product.image2, this.product.image3, this.product.image4],
      customerName: this.customer.name,
      customerPhone: this.customer.phone,
      customerAddress: this.customer.address,
      orderDate: orderDate
    };

    this.orderService.placeOrder(newOrder).subscribe(() => {
      alert('Order placed successfully!');
      this.router.navigate(['/main-page']);
    });
  }
}
