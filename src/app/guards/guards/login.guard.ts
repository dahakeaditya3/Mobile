import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      return true;
    }

    const role = localStorage.getItem('role');
    if (role === 'Customer') {
      this.router.navigate(['/main']);
    } else if (role === 'Seller') {
      this.router.navigate(['/seller-dashboard']);
    } else {
      localStorage.clear();
      return true;
    }

    return false;
  }
}
