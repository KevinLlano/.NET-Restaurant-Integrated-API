import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData: LoginRequest = {
    username: '',
    password: ''
  };

  loading = false;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit(): Promise<void> {
    if (!this.loginData.username.trim() || !this.loginData.password.trim()) {
      this.error = 'Please enter both username and password.';
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      await this.authService.login(this.loginData);
      this.loading = false;
      this.router.navigate(['/customers']); // Redirect to customers page after login
    } catch (err: any) {
      this.loading = false;
      this.error = 'Invalid username or password.';
      console.error('Login error:', err);
    }
  }
}