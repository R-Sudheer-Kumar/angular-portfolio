import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-admin-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <section class="login-section">
      <div class="login-card">
        <div class="login-header">
          <div class="lock-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h2>Admin Access</h2>
          <p>Sign in to manage your portfolio content</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
          <div class="form-group">
            <label for="username">Username</label>
            <input id="username" type="text" formControlName="username" placeholder="admin"
                   autocomplete="username">
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" formControlName="password" placeholder="••••••••"
                   autocomplete="current-password">
          </div>

          <div class="error-banner" *ngIf="errorMessage">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            {{ errorMessage }}
          </div>

          <button type="submit" class="btn btn-primary login-btn" [disabled]="isLoading">
            <span *ngIf="!isLoading">Sign In</span>
            <span *ngIf="isLoading" class="loading">
              <span class="spinner"></span>
              Authenticating...
            </span>
          </button>
        </form>
      </div>
    </section>
  `,
    styles: [`
    .login-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .login-card {
      width: 100%;
      max-width: 420px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 2.5rem;
      backdrop-filter: blur(10px);
    }

    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .lock-icon {
      width: 64px;
      height: 64px;
      border-radius: 16px;
      background: var(--hover-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent-color);
      margin: 0 auto 1rem;
    }

    .login-header h2 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .login-header p {
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    .form-group {
      margin-bottom: 1.25rem;
    }

    .form-group label {
      display: block;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .form-group input {
      width: 100%;
      padding: 0.85rem 1rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      color: var(--text-primary);
      font-size: 0.9rem;
      transition: all 0.3s ease;
      outline: none;
    }

    .form-group input:focus {
      border-color: var(--accent-color);
      box-shadow: 0 0 0 3px var(--accent-glow);
    }

    .error-banner {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 10px;
      color: var(--error);
      font-size: 0.85rem;
      margin-bottom: 1rem;
    }

    .login-btn {
      width: 100%;
      justify-content: center;
      padding: 1rem;
    }

    .loading {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .spinner {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class AdminLoginComponent {
    loginForm: FormGroup;
    isLoading = false;
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onLogin(): void {
        if (this.loginForm.invalid) return;

        this.isLoading = true;
        this.errorMessage = '';

        this.authService.login(this.loginForm.value).subscribe({
            next: () => {
                this.router.navigate(['/admin']);
            },
            error: (err) => {
                this.errorMessage = 'Invalid credentials. Please try again.';
                this.isLoading = false;
            }
        });
    }
}
