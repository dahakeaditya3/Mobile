import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../models/interface/order.interface';

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

}
