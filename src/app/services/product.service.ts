import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../models/interface/products.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'https://localhost:7125/api/Products';

  constructor(private http: HttpClient) { }

  GetAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/GetAllProducts`);
  }

  GetProductsBySeller(sellerId: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/GetProductsBySeller/${sellerId}`);
  }

  deleteProduct(productId: number) {
    return this.http.delete(`${this.baseUrl}/${productId}`);
  }

  GetProductById(id: number): Observable<IProduct | IProduct[]> {
    return this.http.get<IProduct | IProduct[]>(`${this.baseUrl}/GetProductById/${id}`);
  }
}

