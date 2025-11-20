import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private apiUrl = 'https://localhost:7011/api/Account';

  constructor(private http: HttpClient) { }

  sendOtp(email: string) {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  verifyOtp(email: string, otp: string) {
    return this.http.post(`${this.apiUrl}/verify-otp`, { email, otp });
  }

  resetPassword(email: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/reset-password`, { email, newPassword });
  }
}