import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISeller } from '../models/interface/seller.interface';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private apiUrl = 'https://localhost:7125/api/Seller'; // base API

  constructor(private http: HttpClient) { }

  // Register seller
  registerSeller(seller: ISeller): Observable<any> {
    return this.http.post(`${this.apiUrl}/addSeller`, seller);
  }

  // Get seller by ID (profile page)
  getSellerById(id: number): Observable<ISeller> {
    return this.http.get<ISeller>(`${this.apiUrl}/${id}`);
  }

  // Update seller by ID
  updateSellerById(id: number, updatedSeller: ISeller): Observable<ISeller> {
    return this.http.put<ISeller>(`${this.apiUrl}/${id}`, updatedSeller);
  }
}
