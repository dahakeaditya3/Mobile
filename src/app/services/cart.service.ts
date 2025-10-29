import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBulkCheckoutDto, ICartItemCreate, ICartItemRead, ICartItemUpdate } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private base = 'https://localhost:7011/api/Cart';

  constructor(private http: HttpClient) { }

  addToCart(dto: ICartItemCreate): Observable<ICartItemRead> {
    return this.http.post<ICartItemRead>(`${this.base}/add`, dto);
  }

  getCart(customerId: number): Observable<ICartItemRead[]> {
    return this.http.get<ICartItemRead[]>(`${this.base}/${customerId}`);
  }

  updateItem(dto: ICartItemUpdate) {
    return this.http.put(`${this.base}/update`, dto);
  }

  removeItem(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }

  checkout(dto: IBulkCheckoutDto) {
    return this.http.post(`${this.base}/checkout`, dto);
  }
}
