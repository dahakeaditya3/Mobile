import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SellerDashboard } from '../models/seller-dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class SellerDashboardService {
  private baseUrl = 'https://localhost:7011/api/SellerDashboard/6?year=2025&month=11';

  constructor(private http: HttpClient) {}

  getDashboard(sellerId: number, year?: number, month?: number): Observable<SellerDashboard> {
    let params = new HttpParams();
    if (year) params = params.set('year', year.toString());
    if (month) params = params.set('month', month.toString());

    return this.http.get<SellerDashboard>(`${this.baseUrl}/${sellerId}`, { params });
  }
}
