import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  // private apiUrl = 'http://localhost:5113/api/Users';
  private apiUrl = 'https://api2.sersim.com.tr/api/Users';
  private tokenKey = 'token';
  private roleKey = 'role';
  private usernameKey = 'username';
  

  isLoggedIn = new BehaviorSubject<boolean>(false);
  userRole = new BehaviorSubject<string | null>(null);
  userName = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient, 
    private router: Router
  ) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post<{ token: string; role: string }>(`${this.apiUrl}/login`, credentials);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  setToken(token: string, role: string, username: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.roleKey, role);
    localStorage.setItem(this.usernameKey, username); 
    this.isLoggedIn.next(true);
    this.userRole.next(role);
    this.userName.next(username);

  }

  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  getRole() {
    return localStorage.getItem(this.roleKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.usernameKey);
    this.isLoggedIn.next(false);
    this.userRole.next(null);
    this.userName.next(null);
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  isSuperAdmin() {
    return this.getRole() === 'SuperAdmin';
  }

}
