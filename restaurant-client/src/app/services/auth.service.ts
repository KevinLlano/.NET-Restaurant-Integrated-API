import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Check if user was previously logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.isAuthenticatedSubject.next(isLoggedIn);
  }

  login(credentials: LoginRequest): Promise<boolean> {
    // Simple demo authentication - hardcoded credentials
    if (credentials.username === 'admin' && credentials.password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      this.isAuthenticatedSubject.next(true);
      return Promise.resolve(true);
    }
    return Promise.reject(new Error('Invalid credentials'));
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}