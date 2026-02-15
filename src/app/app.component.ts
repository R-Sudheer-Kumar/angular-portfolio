import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ThemeService } from './core/services/theme.service';
import { filter } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <app-navbar *ngIf="!isAdminRoute"></app-navbar>
    <main class="main-content" [ngClass]="{'admin-layout': isAdminRoute}">
      <router-outlet></router-outlet>
    </main>
    <app-footer *ngIf="!isAdminRoute"></app-footer>
  `,
  styles: [`
    .main-content {
      min-height: 100vh;
    }
    .admin-layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class AppComponent implements OnInit {
  isAdminRoute = false;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    // Update page title on route change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isAdminRoute = this.router.url.includes('/admin');

      const route = this.getDeepestRoute(this.router.routerState.root);
      const title = route?.data?.['title'] || 'Sudheer Kumar - Full Stack Developer';
      this.titleService.setTitle(title);

      // Scroll to top on navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /** Traverse to the deepest activated route */
  private getDeepestRoute(route: any): any {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot;
  }
}
