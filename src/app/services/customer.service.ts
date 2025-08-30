import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomer } from '../models/interface/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'https://localhost:7125/api/Customer';

  constructor(private http: HttpClient) { }

  // Register new customer
  registerCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(`${this.baseUrl}/addCustomer`, customer);
  }

  // Get customer by id
  getCustomerById(id: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(`${this.baseUrl}/${id}`);
  }

  // Update customer info
  updateCustomer(customerId: number, customer: ICustomer): Observable<ICustomer> {
    return this.http.put<ICustomer>(`${this.baseUrl}/updateCustomer/${customer.customerId}`, customer);
  }
}
