// components/seller-order/seller-order.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerNavComponent } from '../seller-nav/seller-nav.component';
import { CustomerOrder, Order, SellerOrder } from '../../models/order';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seller-orders',
  standalone: true,
  imports: [CommonModule, SellerNavComponent],
  templateUrl: './seller-order.component.html',
  styleUrls: ['./seller-order.component.css']
})
export class SellerOrdersComponent implements OnInit {
  orders: SellerOrder[] = [];
  sellerId: number = 0; 

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role === 'Seller') {
      this.sellerId = Number(localStorage.getItem('userId')); 
      this.loadOrders();
    }
  }

  loadOrders() {
    this.http.get<SellerOrder[]>(`https://localhost:7087/api/orders/byseller/${this.sellerId}`)
      .subscribe({
        next: (data) => this.orders = data,
        error: (err) => console.error(err)
      });
  }
}
