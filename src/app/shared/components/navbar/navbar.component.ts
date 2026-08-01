import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService, ThemeMode } from '../../../core/services/theme.service';
import { FirebaseService } from '../../../core/services/firebase.service';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('mobileMenu', [
      state('closed', style({
        height: '0',
        opacity: '0',
        visibility: 'hidden'
      })),
      state('open', style({
        height: '*',
        opacity: '1',
        visibility: 'visible'
      })),
      transition('closed <=> open', animate('300ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ])
  ],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled" [class.mobile-open]="isMobileMenuOpen" @slideDown>
      <div class="nav-container">
        <!-- Logo -->
        <div class="nav-logo">
          <a routerLink="/" class="logo-link" (click)="closeMobileMenu()">
            <span class="logo-icon">&lt;</span>
            <span class="logo-text">SK</span>
            <span class="logo-icon">/&gt;</span>
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="nav-links desktop-only">
          <ul>
            <li *ngFor="let item of navItems">
              <a [routerLink]="item.path"
                 routerLinkActive="active"
                 [routerLinkActiveOptions]="{exact: item.path === '/'}"
                 class="nav-link">
                {{ item.label }}
                <span class="link-indicator"></span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Right Side Actions -->
        <div class="nav-actions">
          <!-- Theme Toggle -->
          <button class="theme-toggle" (click)="toggleTheme()" [attr.aria-label]="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
            <span class="toggle-icon" [class.rotated]="isDark">
              <svg *ngIf="!isDark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              <svg *ngIf="isDark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </span>
          </button>

          <!-- Resume Button (Desktop) -->
          <a [href]="profile?.resumeUrl || '/assets/resume.pdf'" target="_blank" class="btn-resume desktop-only">
            Resume
          </a>

          <!-- Mobile Menu Toggle -->
          <button class="mobile-toggle" [class.active]="isMobileMenuOpen" (click)="toggleMobileMenu()" aria-label="Toggle menu">
            <span class="hamburger"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div class="mobile-menu" [@mobileMenu]="isMobileMenuOpen ? 'open' : 'closed'">
        <ul>
          <li *ngFor="let item of navItems; let i = index">
            <a [routerLink]="item.path"
               routerLinkActive="active"
               [routerLinkActiveOptions]="{exact: item.path === '/'}"
               class="mobile-nav-link"
               (click)="closeMobileMenu()">
               <span class="link-num">0{{i + 1}}.</span>
               {{ item.label }}
            </a>
          </li>
          <li>
            <a [href]="profile?.resumeUrl || '/assets/resume.pdf'" target="_blank" class="mobile-resume-link" (click)="closeMobileMenu()">
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      padding: 1.5rem 0;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      background: transparent;
    }

    .navbar.scrolled {
      padding: 1rem 0;
      background: var(--bg-nav);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-color);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* Logo Styles */
    .logo-link {
      display: flex;
      align-items: center;
      gap: 2px;
      font-size: 1.5rem;
      font-weight: 800;
      text-decoration: none;
      color: var(--text-primary);
      font-family: 'JetBrains Mono', monospace;
    }

    .logo-icon {
      color: var(--accent-color);
      opacity: 0.8;
    }

    .logo-text {
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Desktop Navigation */
    .nav-links ul {
      display: flex;
      gap: 2.5rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-link {
      position: relative;
      text-decoration: none;
      color: var(--text-secondary);
      font-size: 0.95rem;
      font-weight: 500;
      transition: color 0.3s ease;
      padding: 0.5rem 0;
    }

    .nav-link:hover, .nav-link.active {
      color: var(--accent-color);
    }

    .link-indicator {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--accent-gradient);
      transition: width 0.3s ease;
      border-radius: 2px;
    }

    .nav-link:hover .link-indicator,
    .nav-link.active .link-indicator {
      width: 100%;
    }

    /* Actions & Buttons */
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .theme-toggle {
      background: none;
      border: 1px solid var(--border-color);
      width: 40px;
      height: 40px;
      border-radius: 10px;
      color: var(--text-primary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .theme-toggle:hover {
      border-color: var(--accent-color);
      background: var(--hover-bg);
      color: var(--accent-color);
    }

    .toggle-icon {
      display: flex;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .toggle-icon.rotated {
      transform: rotate(360deg);
    }

    .btn-resume {
      text-decoration: none;
      padding: 0.6rem 1.4rem;
      border: 1px solid var(--accent-color);
      color: var(--accent-color);
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      transition: all 0.3s ease;
      background: transparent;
    }

    .btn-resume:hover {
      background: var(--accent-color);
      color: white;
      box-shadow: 0 4px 15px var(--accent-glow);
    }

    /* Mobile Toggle (Hamburger) */
    .mobile-toggle {
      display: none;
      background: none;
      border: none;
      padding: 10px;
      cursor: pointer;
      z-index: 1001;
    }

    .hamburger {
      display: block;
      width: 24px;
      height: 2px;
      background: var(--text-primary);
      position: relative;
      transition: all 0.3s ease;
    }

    .hamburger::before, .hamburger::after {
      content: '';
      position: absolute;
      width: 24px;
      height: 2px;
      background: var(--text-primary);
      left: 0;
      transition: all 0.3s ease;
    }

    .hamburger::before { top: -8px; }
    .hamburger::after { bottom: -8px; }

    .mobile-toggle.active .hamburger {
      background: transparent;
    }

    .mobile-toggle.active .hamburger::before {
      top: 0;
      transform: rotate(45deg);
    }

    .mobile-toggle.active .hamburger::after {
      bottom: 0;
      transform: rotate(-45deg);
    }

    /* Mobile Menu */
    .mobile-menu {
      display: none;
      background: var(--bg-primary);
      padding: 1.5rem 2rem 3rem;
      overflow: hidden;
    }

    .mobile-menu ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .mobile-nav-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.2rem 0;
      text-decoration: none;
      color: var(--text-primary);
      font-size: 1.25rem;
      font-weight: 600;
      border-bottom: 1px solid var(--border-color);
    }

    .link-num {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      color: var(--accent-color);
    }

    .mobile-resume-link {
      display: block;
      margin-top: 2rem;
      padding: 1rem;
      text-align: center;
      background: var(--accent-gradient);
      color: white;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 700;
    }

    /* Responsive Queries */
    @media (max-width: 768px) {
      .desktop-only {
        display: none;
      }

      .mobile-toggle, .mobile-menu {
        display: block;
      }

      .navbar {
        background: var(--bg-nav);
        backdrop-filter: blur(12px);
      }
    }
  `]
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;
  isDark = false;

  navItems = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'Skills', path: '/skills' },
    { label: 'Experience', path: '/experience' },
    { label: 'Contact', path: '/contact' }
  ];

  profile: any = null;

  constructor(
    private themeService: ThemeService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme: ThemeMode) => {
      this.isDark = theme === 'dark';
    });

    this.firebaseService.getProfile().subscribe(profile => {
      this.profile = profile;
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = 'auto';
  }
}
