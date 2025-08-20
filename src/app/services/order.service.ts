import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../models/interface/order.interface';

export interface Order {
  id: string;
  productId: string;
  productName: string;
  price: number;
  images: string[];
  customer_id: number;   // ✅ snake_case same as db.json
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  orderDate: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  placeOrder(order: any): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }

  getOrdersByCustomerId(customerId: number): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.apiUrl}?customer_id=${customerId}`);
  }

  getOrdersByCustomer(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}?customer_id=${customerId}`);
  }

}




