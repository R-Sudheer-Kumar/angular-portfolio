import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../core/services/firebase.service';
import { Project } from '../../core/models/portfolio.models';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section projects-section">
      <!-- Background Elements -->
      <div class="glow-bg"></div>

      <div class="container">
        <!-- Header -->
        <div class="section-header fade-in">
          <span class="section-badge">Portfolio</span>
          <h2 class="section-title">Selected <span class="gradient-text">Work</span></h2>
          <p class="section-desc">
            A collection of projects demonstrating expertise in full-stack architecture, API design, and modern UI development.
          </p>
        </div>

        <!-- Filter Tabs -->
        <div class="filter-bar fade-in delay-1">
          <button *ngFor="let cat of categories" 
                  class="filter-chip"
                  [class.active]="activeCategory === cat"
                  (click)="filterByCategory(cat)">
            {{ cat }}
          </button>
        </div>

        <!-- Projects Grid -->
        <div class="projects-grid">
          <div class="project-card fade-in-up" 
               *ngFor="let project of filteredProjects; let i = index"
               [style.animation-delay]="(i * 0.1) + 's'">
            
            <!-- Card Image Area (Gradient Placeholder) -->
            <div class="card-visual">
              <div class="visual-gradient" [ngClass]="getGradientClass(i)"></div>
              <div class="visual-overlay"></div>
              
              <div class="visual-content">
                <div class="visual-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>

                <!-- Live Preview Button Overlay -->
                <a *ngIf="project.liveUrl" 
                   [href]="project.liveUrl" 
                   target="_blank" 
                   class="live-preview-btn">
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                     <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                     <polyline points="15 3 21 3 21 9"/>
                     <line x1="10" y1="14" x2="21" y2="3"/>
                   </svg>
                   Live Preview
                </a>
              </div>
            </div>

            <!-- Card Content -->
            <div class="card-content">
              <div class="card-meta">
                <span class="category-tag">{{ project.category }}</span>
              </div>

              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-desc">{{ project.description }}</p>

              <div class="tech-row">
                <span class="tech-pill" *ngFor="let tech of project.techStack | slice:0:3">{{ tech }}</span>
                <span class="tech-more" *ngIf="project.techStack.length > 3">+{{ project.techStack.length - 3 }}</span>
              </div>

              <!-- Action Buttons -->
              <div class="card-actions">
                <a *ngIf="project.liveUrl" 
                   [href]="project.liveUrl" 
                   target="_blank" 
                   class="action-btn live">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                     <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                   </svg>
                   Live Demo
                </a>
                <a *ngIf="project.githubUrl" 
                   [href]="project.githubUrl" 
                   target="_blank" 
                   class="action-btn github">
                   <img src="https://cdn.simpleicons.org/github/white" width="16" height="16" alt="GitHub">
                   Source
                </a>
              </div>
            </div>

            <!-- Spotlight Effect -->
            <div class="spotlight"></div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* ─── Variables ────────────────────────────────────────── */
    :host {
      --primary: #6366f1;
      --secondary: #8b5cf6;
      --bg-dark: #0f172a;
      --card-bg: #1e293b;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
    }

    .section {
      padding: 8rem 0;
      min-height: 100vh;
      background: var(--bg-dark);
      position: relative;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .glow-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 500px;
      background: radial-gradient(circle at 50% -20%, rgba(99, 102, 241, 0.15), transparent 70%);
      pointer-events: none;
    }

    /* ─── Header ──────────────────────────────────────────── */
    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: rgba(99, 102, 241, 0.1);
      color: #818cf8;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1rem;
    }

    .section-title {
      font-size: 3rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 1rem;
    }

    .gradient-text {
      background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .section-desc {
      font-size: 1.125rem;
      color: var(--text-muted);
      max-width: 600px;
      margin: 0 auto;
    }

    /* ─── Filter Bar ──────────────────────────────────────── */
    .filter-bar {
      display: flex;
      justify-content: center;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-bottom: 3rem;
    }

    .filter-chip {
      padding: 0.5rem 1.25rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .filter-chip:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-main);
    }

    .filter-chip.active {
      background: var(--primary);
      color: white;
      border-color: var(--primary);
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }

    /* ─── Projects Grid ───────────────────────────────────── */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 2rem;
    }

    .project-card {
      background: var(--card-bg);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 1.5rem;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .project-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.4);
      border-color: rgba(99, 102, 241, 0.3);
    }

    /* ─── Card Visual ─────────────────────────────────────── */
    .card-visual {
      height: 200px;
      position: relative;
      overflow: hidden;
    }

    .visual-gradient {
      width: 100%;
      height: 100%;
      transition: transform 0.5s ease;
    }

    .grad-0 { background: linear-gradient(135deg, #4f46e5, #ec4899); }
    .grad-1 { background: linear-gradient(135deg, #0ea5e9, #10b981); }
    .grad-2 { background: linear-gradient(135deg, #f59e0b, #ef4444); }
    .grad-3 { background: linear-gradient(135deg, #8b5cf6, #6366f1); }

    .project-card:hover .visual-gradient {
      transform: scale(1.1);
    }

    .visual-overlay {
      position: absolute;
      inset: 0;
      background: rgba(15, 23, 42, 0.2);
    }
    
    .visual-content {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 10;
    }

    .visual-icon {
      color: white;
      opacity: 0.8;
      background: rgba(255, 255, 255, 0.1);
      padding: 1rem;
      border-radius: 50%;
      backdrop-filter: blur(4px);
    }

    /* ─── Card Content ────────────────────────────────────── */
    .card-content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .category-tag {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 700;
      color: var(--secondary);
    }

    .project-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 0.5rem;
    }

    .project-desc {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }

    .tech-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .tech-pill {
      font-size: 0.75rem;
      padding: 0.25rem 0.625rem;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
      color: var(--text-muted);
    }

    .tech-more {
      font-size: 0.75rem;
      color: var(--text-muted);
      padding: 0.25rem 0.625rem;
    }

    /* ─── Card Actions ───────────────────────────────────── */
    .card-actions {
      display: flex;
      gap: 0.75rem;
      margin-top: auto;
    }

    .action-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.625rem;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .action-btn.live {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: white;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }

    .action-btn.live:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
    }

    .action-btn.github {
      background: rgba(255, 255, 255, 0.05);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .action-btn.github:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }

    /* ─── Animations ──────────────────────────────────────── */
    .fade-in { animation: fadeIn 0.8s ease forwards; opacity: 0; }
    .fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; transform: translateY(20px); }
    
    @keyframes fadeIn { to { opacity: 1; } }
    @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
    
    .delay-1 { animation-delay: 0.2s; }

    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  categories: string[] = ['All'];
  activeCategory = 'All';

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.getProjects().subscribe(projects => {
      this.projects = projects.sort((a, b) => a.order - b.order);
      this.filteredProjects = [...this.projects];

      const cats = new Set(projects.map(p => p.category));
      this.categories = ['All', ...Array.from(cats)];
    });
  }

  filterByCategory(category: string): void {
    this.activeCategory = category;
    this.filteredProjects = category === 'All'
      ? [...this.projects]
      : this.projects.filter(p => p.category === category);
  }

  getGradientClass(index: number): string {
    return `grad-${index % 4}`;
  }
}
