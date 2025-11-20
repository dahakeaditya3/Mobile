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
    const formData = new FormData();

    formData.append('productId', rating.productId.toString());
    formData.append('customerId', rating.customerId.toString());
    formData.append('ratingValue', rating.ratingValue.toString());
    formData.append('review', rating.review ?? '');

    if (rating.image1) formData.append('image1', rating.image1);
    if (rating.image2) formData.append('image2', rating.image2);
    if (rating.image3) formData.append('image3', rating.image3);
    if (rating.image4) formData.append('image4', rating.image4);

    return this.http.post(`${this.apiUrl}/add`, formData);
  }

  getAverageRating(productId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/average/${productId}`);
  }

  getRatings(productId: number): Observable<ProductRatingResponse[]> {
    return this.http.get<ProductRatingResponse[]>(`${this.apiUrl}/${productId}`);
  }
}
