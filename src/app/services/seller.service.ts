import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private apiUrl = 'http://localhost:3000/seller'; // json-server endpoint

  constructor(private http: HttpClient) { }

  registerSeller(seller: any): Observable<any> {
    return this.http.post(this.apiUrl, seller);
  }

  getCurrentSeller() {
    // for now just fetch first seller (later use login auth id)
    return this.http.get<any>(`${this.apiUrl}/1`);
  }
}


