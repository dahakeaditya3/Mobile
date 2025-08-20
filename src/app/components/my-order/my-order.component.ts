import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService, Order } from '../../services/order.service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInUser');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      const customerId = user.customer_id;   // ✅ match db.json field

      // ✅ Fetch orders for this customer
      this.orderService.getOrdersByCustomer(customerId).subscribe((res) => {
        console.log('Fetched Orders:', res);  // debug
        this.orders = res;
      });
    }
  }
}
