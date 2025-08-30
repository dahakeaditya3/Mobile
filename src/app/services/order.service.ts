import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../models/interface/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://localhost:7125/api/Orders';

  constructor(private http: HttpClient) { }

  createOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(this.apiUrl, order);
  }
}
