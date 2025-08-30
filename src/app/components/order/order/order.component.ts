import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { OrderService } from '../../../services/order.service';
import { IProduct } from '../../../models/interface/products.interface';
import { IOrder } from '../../../models/interface/order.interface';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  product: IProduct | null = null;
  order: Partial<IOrder> = {
    receiverName: '',
    receiverPhoneNo: '',
    shippingAddress: '',
    productId: 0
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (productId) {
      this.productService.GetProductById(productId).subscribe({
        next: (res) => {
         // this.product = res;
          this.order.productId = productId; // link order with product
        },
        error: (err) => console.error('Error loading product:', err)
      });
    }
  }

  submitOrder(form: NgForm) {
    if (form.valid && this.order.productId) {
      this.orderService.createOrder(this.order as IOrder).subscribe({
        next: (res) => {
          alert('✅ Order placed successfully!');
          form.resetForm();
        },
        error: (err) => console.error('Error placing order:', err)
      });
    }
  }
}
