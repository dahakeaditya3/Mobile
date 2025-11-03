import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductRating, ProductRatingResponse } from '../models/product-rating.model';

@Injectable({
  providedIn: 'root'
})
export class ProductRatingService {
  private apiUrl = 'https://localhost:7011/api/ProductRating';

  constructor(private http: HttpClient) { }

  addRating(rating: ProductRating): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, rating);
  }

  getAverageRating(productId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/average/${productId}`);
  }

  getRatings(productId: number): Observable<ProductRatingResponse[]> {
    return this.http.get<ProductRatingResponse[]>(`${this.apiUrl}/${productId}`);
  }
}
