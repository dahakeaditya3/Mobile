import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // ✅ Change this URL when your API is ready
  private jsonUrl = 'assets/data/products.json';
  // private apiUrl = 'https://your-api-url.com/products';

  constructor(private http: HttpClient) { }

  // Fetch all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl); // Later: replace with apiUrl
  }
}
