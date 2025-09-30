// components/customer-order/customer-order.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerNavComponent } from '../customer-nav/customer-nav.component';
import { CustomerOrder } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [CommonModule, CustomerNavComponent],
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css']
})
export class CustomerOrdersComponent implements OnInit {
  orders: CustomerOrder[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    const customerId = Number(localStorage.getItem('userId'));
    this.orderService.getOrdersByCustomer(customerId).subscribe({
      next: (data) => this.orders = data,
      error: (err) => console.error('Error fetching orders:', err)
    });
  }
}
