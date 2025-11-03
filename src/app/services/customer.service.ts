import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private baseUrl = 'https://localhost:7011/api/customers';

  constructor(private http: HttpClient) { }

  getProfile(customerId: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${customerId}`);
  }

  updateProfile(customer: Customer): Observable<any> {
    return this.http.put(`${this.baseUrl}/${customer.customerId}`, customer);
  }

}
