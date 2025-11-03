import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerOrder, Order, OrderCreate, OrderUpdateStatusDto, SellerOrder } from '../models/order';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private baseUrl = 'https://localhost:7011/api/Orders';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  getBySellerId(sellerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/byseller/${sellerId}`);
  }

  delete(orderId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${orderId}`);
  }

  createOrder(orderData: OrderCreate): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, orderData);
  }

  getOrdersByCustomer(customerId: number): Observable<CustomerOrder[]> {

    return this.http.get<CustomerOrder[]>(`${this.baseUrl}/bycustomer/${customerId}`);
  }

  updateOrderStatus(orderId: number, dto: { newStatus: string }) {
    return this.http.put(`${this.baseUrl}/${orderId}/status`, dto);
  }
  getOrdersBySellerr(sellerId: number): Observable<SellerOrder[]> {
    return this.http.get<SellerOrder[]>(`${this.baseUrl}/byseller/${sellerId}`);
  }

  // getOrdersBySeller(sellerId: number): Observable<CustomerOrder[]> {
  //   return this.http.get<CustomerOrder[]>(`${this.baseUrl}/byseller/${sellerId}`);
  // }

  //  updateStatus(id: number, dto: OrderUpdateStatusDto): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/${id}/status`, dto);
  // }

  // getById(id: number): Observable<Order> {
  //   return this.http.get<Order>(`${this.baseUrl}/${id}`);
  // }

   // getByCustomerId(customerId: number): Observable<Order[]> {
  //   return this.http.get<Order[]>(`${this.baseUrl}/bycustomer/${customerId}`);
  // }
}

