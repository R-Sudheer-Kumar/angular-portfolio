import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Route guard to protect admin routes.
 * Redirects to login if not authenticated.
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(): boolean {
        if (this.authService.isAuthenticated) {
            return true;
        }
        this.router.navigate(['/admin/login']);
        return false;
    }
}
