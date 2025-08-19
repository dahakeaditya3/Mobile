import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

export interface Product {
  id: string;
  products_id: number;
  seller_id: number;
  name: string;
  price: number;
  company: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient, private router: Router) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

}
