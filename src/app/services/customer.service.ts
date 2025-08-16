import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomer } from './../models/interface/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) { }

  registerCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(this.apiUrl, customer);
  }

  getCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.apiUrl);
  }
}
