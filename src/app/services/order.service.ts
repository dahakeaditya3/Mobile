import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerOrder, Order, OrderCreate } from '../models/order';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private baseUrl = 'https://localhost:7011/api/Orders';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  getBySellerId(sellerId: number): Observable<Order[]> {
    debugger;
    return this.http.get<Order[]>(`${this.baseUrl}/byseller/${sellerId}`);
  }

  getByCustomerId(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/bycustomer/${customerId}`);
  }

  delete(orderId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${orderId}`);
  }

  createOrder(order: OrderCreate): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order);
  }

  getOrdersByCustomer(customerId: number): Observable<CustomerOrder[]> {
    debugger;
    return this.http.get<CustomerOrder[]>(`${this.baseUrl}/bycustomer/${customerId}`);
  }

  getOrdersBySeller(sellerId: number): Observable<CustomerOrder[]> {
    return this.http.get<CustomerOrder[]>(`${this.baseUrl}/byseller/${sellerId}`);
  }
}

