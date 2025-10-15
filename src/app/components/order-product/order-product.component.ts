import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { OrderCreate } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { CustomerNavComponent } from "../customer-nav/customer-nav.component";
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-order-product',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomerNavComponent],
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css']
})
export class OrderProductComponent implements OnInit {

  product: IProduct | null = null;
  productId!: number;
  quantity: number = 1;
  totalPrice: number = 0;

  orderData: OrderCreate = {
    customerId: 0,
    productId: 0,
    quantity: 1,
    totalPrice: 0,
    receiverName: '',
    receiverContactNumber: '',
    orderAddress: '',
    postalCode: '',
    customerName: '',
    productName: ''
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private orderService: OrderService,
    private toast: ToastService 
  ) { }

  ngOnInit(): void {
    const customerId = Number(localStorage.getItem('userId'));
    this.orderData.customerId = customerId;

    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.orderData.productId = this.productId;
    this.loadProductDetails();
  }

loadProductDetails() {
  this.productService.getById(this.productId).subscribe({
    next: (data) => {
      this.product = data;

      const customerName = localStorage.getItem('userName') || 'Customer';

      this.updateTotal();
    },
    error: (err) => {
      console.error('Error loading product:', err);
       this.toast.show('Product not found!', 'error'); 
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
    if (this.quantity < 1) this.quantity = 1;
    if (this.product) {
      this.totalPrice = this.product.price * this.quantity;
      this.orderData.quantity = this.quantity;
      this.orderData.totalPrice = this.totalPrice;
    }
  }

 submitOrder(form: any) {
  if (form.invalid) {
    this.toast.show('Please fill all required fields correctly!', 'error');
    form.form.markAllAsTouched(); // Highlight all invalid fields
    return;
  }

  this.orderService.createOrder(this.orderData).subscribe({
    next: () => {
      this.toast.show('Order placed successfully!', 'success');
      this.router.navigate(['/customer-order']);
    },
    error: (err) => {
      console.error(err);
      this.toast.show('Failed to place order', 'error');
    },
  });
}
}
