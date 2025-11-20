// payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentCreateDto, StripeSessionResponse } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'https://localhost:7011/api/payments';

  constructor(private http: HttpClient) {}

  createPayment(paymentDto: PaymentCreateDto): Observable<StripeSessionResponse> {
    return this.http.post<StripeSessionResponse>(`${this.baseUrl}/create-session`, paymentDto);
  }

  getPaymentStatus(orderId: number): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/status/${orderId}`);
  }
}
