import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AdminCredentials, AuthToken } from '../models/portfolio.models';

/**
 * Authentication service for admin panel.
 * Manages JWT token storage and validation.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly TOKEN_KEY = 'portfolio-admin-token';
    private readonly apiUrl = environment.apiUrl;
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

    /** Observable for authentication state */
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient) { }

    /** Check if user is currently authenticated */
    get isAuthenticated(): boolean {
        return this.isAuthenticatedSubject.value;
    }

    /** Login with admin credentials */
    login(credentials: AdminCredentials): Observable<AuthToken> {
        const formData = new FormData();
        formData.append('username', credentials.username);
        formData.append('password', credentials.password);

        return this.http.post<AuthToken>(`${this.apiUrl}/auth/login`, formData).pipe(
            tap(token => {
                this.saveToken(token.access_token);
                this.isAuthenticatedSubject.next(true);
            })
        );
    }

    /** Logout and clear token */
    logout(): void {
        this.removeToken();
        this.isAuthenticatedSubject.next(false);
    }

    /** Get the stored auth token */
    getToken(): string | null {
        try {
            return localStorage.getItem(this.TOKEN_KEY);
        } catch {
            return null;
        }
    }

    /** Verify current token validity */
    verifyToken(): Observable<boolean> {
        const token = this.getToken();
        if (!token) {
            this.isAuthenticatedSubject.next(false);
            return of(false);
        }

        return this.http.get<{ valid: boolean }>(`${this.apiUrl}/auth/verify`, {
            headers: { Authorization: `Bearer ${token}` }
        }).pipe(
            map(res => res.valid),
            tap(isValid => {
                if (isValid) {
                    this.isAuthenticatedSubject.next(true);
                } else {
                    this.logout();
                }
            }),
            catchError(() => {
                this.logout();
                return of(false);
            })
        );
    }

    /** Check if a token exists in localStorage */
    private hasToken(): boolean {
        return !!this.getToken();
    }

    /** Save token to localStorage */
    private saveToken(token: string): void {
        try {
            localStorage.setItem(this.TOKEN_KEY, token);
        } catch {
            // localStorage unavailable
        }
    }

    /** Remove token from localStorage */
    private removeToken(): void {
        try {
            localStorage.removeItem(this.TOKEN_KEY);
        } catch {
            // localStorage unavailable
        }
    }
}
