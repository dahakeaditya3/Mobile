import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Seller } from '../models/seller';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SellerService {
  private baseUrl = 'https://localhost:7087/api/sellers';

  constructor(private http: HttpClient) {}

  getProfile(sellerId: number): Observable<Seller> {
    return this.http.get<Seller>(`${this.baseUrl}/${sellerId}`);
  }

  updateProfile(seller: Seller): Observable<any> {
    return this.http.put(`${this.baseUrl}/${seller.sellerId}`, seller);
  }

  uploadProfilePicture(file: File): Observable<{ fileUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ fileUrl: string }>(`${this.baseUrl}/upload-profile-picture`, formData);
  }
}
