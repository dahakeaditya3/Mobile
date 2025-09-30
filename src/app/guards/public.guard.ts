// public.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role === 'Customer') {
      this.router.navigate(['/main']);  
      return false;
    }

    if (token && role === 'Seller') {
      this.router.navigate(['/seller-dashboard']); 
      return false;
    }

    return true;
  }
}
