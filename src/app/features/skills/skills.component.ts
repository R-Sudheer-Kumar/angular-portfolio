import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FirebaseService } from '../../core/services/firebase.service';
import { Skill } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section skills-section">
       <!-- Background Elements -->
       <div class="background-dots"></div>
       <div class="blob blob-1"></div>
       <div class="blob blob-2"></div>

       <div class="container">
         <div class="section-header">
           <span class="section-label">Expertise</span>
           <h2 class="section-title">Technical <span class="gradient-text">Proficiency</span></h2>
           <p class="section-subtitle">
             Comprehensive command over modern web technologies, cloud infrastructure, and software architecture.
           </p>
         </div>

         <!-- Skills Grid -->
         <div class="skills-category-grid">
           
           <!-- Category Card -->
           <div class="category-card" *ngFor="let category of skillCategories; let i = index" 
                [style.animation-delay]="(i * 0.1) + 's'">
             
             <div class="card-header">
               <div class="icon-box" [innerHTML]="getCategoryIcon(category.name)"></div>
               <h3 class="category-name">{{ category.name }}</h3>
             </div>

             <div class="skill-cloud">
               <div class="skill-tag" *ngFor="let skill of category.skills" [class.highlight]="skill.proficiency >= 90">
                 <span class="skill-icon" *ngIf="skill.icon">
                   <img [src]="skill.icon" [alt]="skill.name">
                 </span>
                 <span class="skill-name">{{ skill.name }}</span>
                 <span class="skill-level-dot" [style.background]="getLevelColor(skill.proficiency)"></span>
               </div>
             </div>
           </div>

         </div>
       </div>
    </section>
  `,
  styles: [`
    :host {
      --primary: #6366f1;
      --secondary: #8b5cf6;
      --bg-dark: #0f172a;
      --card-bg: #1e293b;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --border: rgba(255, 255, 255, 0.08);
    }

    .section {
      padding: 8rem 0;
      min-height: 100vh;
      background: var(--bg-dark);
      position: relative;
      overflow: hidden;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      position: relative;
      z-index: 10;
    }

    /* ─── Background ─────────────────────────────────────── */
    .blob {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      filter: blur(100px);
      opacity: 0.15;
      z-index: 0;
    }
    .blob-1 { top: -10%; left: -10%; background: var(--primary); }
    .blob-2 { bottom: -10%; right: -10%; background: var(--secondary); }
    
    .background-dots {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
      background-size: 30px 30px;
      opacity: 0.3;
      z-index: 0;
    }

    /* ─── Header ─────────────────────────────────────────── */
    .section-header { text-align: center; margin-bottom: 5rem; }
    .section-label { display: inline-block; font-size: 0.875rem; font-weight: 600; color: var(--secondary); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem; }
    .section-title { font-size: 3rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem; }
    .gradient-text { background: linear-gradient(135deg, var(--primary), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .section-subtitle { font-size: 1.125rem; color: var(--text-muted); max-width: 600px; margin: 0 auto; line-height: 1.6; }

    /* ─── Grid ───────────────────────────────────────────── */
    .skills-category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .category-card {
      background: rgba(30, 41, 59, 0.4);
      backdrop-filter: blur(12px);
      border: 1px solid var(--border);
      border-radius: 1.5rem;
      padding: 2rem;
      transition: all 0.3s ease;
      animation: fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      opacity: 0;
      transform: translateY(20px);
    }

    .category-card:hover {
      border-color: rgba(99, 102, 241, 0.3);
      transform: translateY(-5px);
      background: rgba(30, 41, 59, 0.6);
      box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border);
    }

    .icon-box {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: rgba(99, 102, 241, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #818cf8;
    }

    .category-name {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-main);
    }

    /* ─── Skill Cloud ────────────────────────────────────── */
    .skill-cloud {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .skill-tag {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--text-muted);
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .skill-tag:hover {
      background: rgba(255, 255, 255, 0.08);
      color: var(--text-main);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .skill-tag.highlight {
      border-color: rgba(99, 102, 241, 0.3);
      background: rgba(99, 102, 241, 0.05);
      color: #e0e7ff;
    }

    .skill-icon img {
      width: 1.25rem;
      height: 1.25rem;
      filter: grayscale(100%);
      transition: filter 0.2s ease;
    }

    .skill-tag:hover .skill-icon img {
      filter: grayscale(0%);
    }

    .skill-level-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      opacity: 0.8;
    }

    @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

    @media (max-width: 768px) {
      .skills-category-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class SkillsComponent implements OnInit {
  skillCategories: { name: string; skills: Skill[] }[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.firebaseService.getSkills().subscribe(skills => {
      const grouped = skills.reduce((acc, skill) => {
        const cat = skill.category;
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
      }, {} as Record<string, Skill[]>);

      this.skillCategories = Object.entries(grouped)
        .map(([name, skills]) => ({
          name,
          skills: skills.sort((a, b) => b.proficiency - a.proficiency) // Sort by proficiency
        }))
        .sort((a, b) => {
          // Priority order for categories
          const order = ['Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'Tools'];
          return order.indexOf(a.name) - order.indexOf(b.name);
        });
    });
  }

  getLevelColor(proficiency: number): string {
    if (proficiency >= 90) return '#818cf8'; // Indigo (Expert)
    if (proficiency >= 75) return '#34d399'; // Emerald (Advanced)
    return '#fbbf24'; // Amber (Intermediate)
  }

  getCategoryIcon(category: string): SafeHtml {
    const icons: Record<string, string> = {
      'Frontend': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
      'Backend': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
      'Database': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>',
      'Cloud': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
      'DevOps': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
      'Tools': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>'
    };

    // Fallback/Default icon if mapping is missing
    const iconStr = icons[category] || icons['Tools'];
    return this.sanitizer.bypassSecurityTrustHtml(iconStr);
  }
}
