// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private apiUrl = 'http://localhost:3000';

//   constructor(private http: HttpClient) { }

//   loginUser(email: string, password: string): Observable<any> {
//     return this.http.get<any[]>(`${this.apiUrl}/users?email=${email}&password=${password}`)
//       .pipe(map(users => users.length ? users[0] : null));
//   }

//   loginSeller(email: string, password: string): Observable<any> {
//     return this.http.get<any[]>(`${this.apiUrl}/seller?s_email=${email}&password=${password}`)
//       .pipe(map(sellers => sellers.length ? sellers[0] : null));
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

