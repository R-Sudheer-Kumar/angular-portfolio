import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/** Theme modes available */
export type ThemeMode = 'light' | 'dark';

/**
 * Service to manage light/dark theme with persistence.
 * Follows SRP - only handles theme toggling and persistence.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
    private readonly STORAGE_KEY = 'portfolio-theme';
    private themeSubject = new BehaviorSubject<ThemeMode>(this.getSavedTheme());

    /** Observable of the current theme */
    theme$ = this.themeSubject.asObservable();

    constructor() {
        this.applyTheme(this.themeSubject.value);
    }

    /** Get the current theme mode */
    get currentTheme(): ThemeMode {
        return this.themeSubject.value;
    }

    /** Toggle between light and dark themes */
    toggleTheme(): void {
        const newTheme: ThemeMode = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    /** Set a specific theme */
    setTheme(theme: ThemeMode): void {
        this.themeSubject.next(theme);
        this.applyTheme(theme);
        this.saveTheme(theme);
    }

    /** Apply theme to the document body */
    private applyTheme(theme: ThemeMode): void {
        const body = document.body;
        body.classList.remove('light-theme', 'dark-theme');
        body.classList.add(`${theme}-theme`);
        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f0f23' : '#ffffff');
        }
    }

    /** Retrieve saved theme from localStorage or default to dark */
    private getSavedTheme(): ThemeMode {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            return (saved === 'light' || saved === 'dark') ? saved : 'dark';
        } catch {
            return 'dark';
        }
    }

    /** Persist theme choice to localStorage */
    private saveTheme(theme: ThemeMode): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, theme);
        } catch {
            // localStorage not available, silently fail
        }
    }
}
