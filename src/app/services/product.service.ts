import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct, ProductCreate } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7011/api/products';

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getBySellerId(sellerId: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/byseller/${sellerId}`);
  }

    getByProductId(productId: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/${productId}`);
  }

  addProduct(product: ProductCreate): Observable<number> {
    const formData = new FormData();
    formData.append('ProductName', product.productName);
    formData.append('ProductCompany', product.productCompany);
    formData.append('Price', product.price.toString());
    formData.append('Description', product.description);
    formData.append('SellerId', product.sellerId.toString());

    if (product.image1) formData.append('Image1', product.image1);
    if (product.image2) formData.append('Image2', product.image2);
    if (product.image3) formData.append('Image3', product.image3);
    if (product.image4) formData.append('Image4', product.image4);

    return this.http.post<number>(this.baseUrl, formData);
  }
}
