import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthResponse, User } from '../models/auth.model';
//servicio de auth
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private http = inject(HttpClient);

  private router = inject(Router);

  private apiUrl = 'https://api.escuelajs.co/api/v1/auth';

  private tokenKey = 'token';



  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          this.saveToken(response.access_token);
        })
      );
  }



  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    });
  }



  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }



  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }



  isAuthenticated(): boolean {
    return !!this.getToken();
  }



  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('cart');
    this.router.navigate(['/login']);
  }
}
