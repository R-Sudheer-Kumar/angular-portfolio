import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FirebaseService } from '../../core/services/firebase.service';
import { Profile, Project } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Hero Section -->
    <section class="hero-section">
      <!-- Animated Background -->
      <div class="hero-background">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="grid-overlay"></div>
      </div>

      <div class="hero-container">
        <div class="hero-grid">
          
          <!-- Left Column: Content -->
          <div class="hero-content">
            
            <!-- Status Badge -->
            <div class="status-badge fade-in-up">
              <span class="status-indicator">
                <span class="ping"></span>
                <span class="dot"></span>
              </span>
              <span class="status-text">Currently Working</span>
            </div>

            <!-- Headline -->
            <div class="headline-container fade-in-up delay-1">
              <h1 class="hero-headline">
                Building Digital <br />
                <span class="gradient-text animate-gradient">Experiences</span>
              </h1>
              
              <!-- Typing Effect -->
              <div class="typing-container">
                <span class="terminal-arrow">&gt;</span>
                <span class="typing-text">
                  I engineer <span class="highlight">{{ currentTypingWord }}</span>
                </span>
                <span class="cursor"></span>
              </div>
            </div>

            <!-- Bio -->
            <p class="hero-bio fade-in-up delay-2">
              {{ profile?.tagline || 'Full Stack Developer specializing in scalable Angular applications, .NET microservices, and modern cloud architectures. I turn complex problems into elegant, user-centric solutions.' }}
            </p>

            <!-- CTA Buttons -->
            <div class="cta-group fade-in-up delay-3">
              <a routerLink="/projects" class="btn-premium primary">
                <span class="btn-content">View Portfolio</span>
                <svg class="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </a>
              
              <a routerLink="/contact" class="btn-premium secondary">
                Contact Me
              </a>
            </div>
            
            <!-- Tech Stack Removed as requested -->
          </div>

          <!-- Right Column: Visual -->
          <div class="hero-visual fade-in-up delay-2">
            <!-- Glass Terminal Card -->
            <div class="glass-card terminal-card">
              <div class="terminal-header">
                <div class="control red"></div>
                <div class="control yellow"></div>
                <div class="control green"></div>
                <span class="terminal-title">developer.config.ts</span>
              </div>
              <div class="terminal-body">
                <div class="code-line"><span class="line-num">1</span><span><span class="kwd">export </span> <span class="kwd">const </span> <span class="var">developer</span> = <span class="pun">{{ '{' }}</span></span></div>
                <div class="code-line"><span class="line-num">2</span><span class="indent">name: <span class="str">'{{ profile?.name || "Sudheer" }}'</span>,</span></div>
                <div class="code-line"><span class="line-num">3</span><span class="indent">role: <span class="str">'Full Stack Engineer'</span>,</span></div>
                <div class="code-line"><span class="line-num">4</span><span class="indent">skills: [<span class="str">'Angular'</span>, <span class="str">'.NET 8'</span>, <span class="str">'Mongo DB'</span>],</span></div>
                <div class="code-line"><span class="line-num">5</span><span class="indent">status: <span class="const">Status.READY_TO_BUILD</span>,</span></div>
                <div class="code-line"><span class="line-num">6</span><span class="indent">passion: <span class="str">'Creating Impact'</span></span></div>
                <div class="code-line"><span class="line-num">7</span><span><span class="pun">{{ '}' }}</span>;</span></div>
              </div>
              <div class="card-glow"></div>
            </div>

            <!-- Floating Elements -->
            <div class="float-card exp-card">
              <div class="float-content">
                <div class="float-icon-box blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                </div>
                <div><p class="float-label">Experience</p><p class="float-value">1.5+ Years</p></div>
              </div>
            </div>
            <div class="float-card proj-card">
              <div class="float-content">
                <div class="float-icon-box purple">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                </div>
                <div><p class="float-label">Projects</p><p class="float-value">6+ Shipped</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="section about-section">
      <div class="container">
        <div class="about-grid">
          <!-- Text Content -->
          <div class="about-content">
            <span class="section-label">About Me</span>
            <h2 class="section-heading">Engineering Scalable <span class="gradient-text">Solutions</span></h2>
            <p class="about-text">
              I am a <strong>Full Stack Developer</strong> at <strong>Snovasys Solutions</strong>, passionate about building high-performance web applications. My expertise spans <strong>Microfrontends</strong>, <strong>Microservices</strong>, and cloud-native architectures.
            </p>
            <p class="about-text muted">
              Specializing in <strong>Angular</strong> and <strong>.NET 8</strong>, I focus on writing clean, maintainable code that drives business value. Whether optimizing SQL queries or architecting complex frontend states, I deliver robust solutions.
            </p>
            
            <div class="feature-grid">
              <div class="feature-card">
                <div class="feature-icon">🧩</div>
                <h4 class="feature-title">Problem Solver</h4>
                <p class="feature-desc">Turning complex requirements into logical, efficient code.</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <h4 class="feature-title">Performance</h4>
                <p class="feature-desc">Optimizing load times and API response latency.</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">🏗️</div>
                <h4 class="feature-title">Clean Arch</h4>
                <p class="feature-desc">Advocate for SOLID principles and modular design.</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">🤝</div>
                <h4 class="feature-title">Team Player</h4>
                <p class="feature-desc">Collaborative mindset with strong communication.</p>
              </div>
            </div>
          </div>

          <!-- Visual Side -->
          <div class="about-visual">
            <div class="profile-card-glass">
              <div class="card-glow-bg"></div>
              <div class="profile-header">
                <div class="profile-icon">👨‍💻</div>
                <div>
                  <h3 class="profile-name">R. Sudheer Kumar</h3>
                  <p class="profile-role">Full Stack Engineer</p>
                </div>
              </div>
              <div class="profile-stats">
                <div class="stat-row">
                  <span class="stat-label">Location</span>
                  <span class="stat-val">Andhra Pradesh, India</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">Experience</span>
                  <span class="stat-val">1.5+ Years</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label">Status</span>
                  <span class="stat-badge working">Working</span>
                </div>
              </div>
              <div class="tech-pills">
                <span>Angular 18</span><span>.NET 8</span><span>SQL</span><span>Azure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section class="section featured-section">
      <div class="container">
        <div class="section-header-center">
          <span class="section-label">Portfolio</span>
          <h2 class="section-heading">Featured <span class="gradient-text">Projects</span></h2>
          <p class="section-subtext">A selection of my recent work in web development and software engineering.</p>
        </div>

        <div class="featured-grid">
          <div class="project-item" *ngFor="let project of featuredProjects; let i = index">
            <div class="project-card-glass">
              <!-- Visual Gradient Placeholder -->
              <div class="project-visual" [ngClass]="getGradientClass(i)">
                <div class="visual-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <div class="visual-overlay"></div>
              </div>
              
              <!-- Content -->
              <div class="project-content">
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-desc">{{ project.description }}</p>
                
                <div class="project-tech">
                  <span class="tech-badge" *ngFor="let tech of project.techStack | slice:0:4">{{ tech }}</span>
                </div>
                
                <div class="project-links">
                  <!-- GitHub Button -->
                  <a *ngIf="project.githubUrl" [href]="project.githubUrl" target="_blank" class="link-btn github">
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                     <span>Source</span>
                  </a>

                  <!-- Live Preview Button (Highlighted) -->
                  <a *ngIf="project.liveUrl" [href]="project.liveUrl" target="_blank" class="link-btn live">
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                     <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="view-more-container">
           <a routerLink="/projects" class="btn-premium secondary">View All Projects</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* ─── Global Vars & Helper ───────────────────────────── */
    :host {
      --bg-dark: #0f172a;
      --bg-card: rgba(30, 41, 59, 0.6);
      --primary: #6366f1;
      --secondary: #8b5cf6;
      --text-white: #f8fafc;
      --text-muted: #94a3b8;
      --border: rgba(255, 255, 255, 0.08);
      --border-hover: rgba(99, 102, 241, 0.3);
    }
    
    /* ─── Hero Fixes ─────────────────────────────────────── */
    .hero-section {
      width: 100%;
      min-height: 100vh;
      position: relative;
      background-color: var(--bg-dark);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6rem 2rem;
    }

    /* Fixed Button: Single Line */
    .btn-premium {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.875rem 2rem;
      border-radius: 12px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      cursor: pointer;
      white-space: nowrap; /* Forces one line */
      min-width: 160px;
    }
    
    .btn-premium.primary { background: #4f46e5; color: white; box-shadow: 0 4px 14px 0 rgba(79, 70, 229, 0.4); }
    .btn-premium.primary:hover { background: #4338ca; transform: translateY(-2px); }
    .btn-premium.secondary { background: rgba(255, 255, 255, 0.05); color: var(--text-white); border: 1px solid rgba(255, 255, 255, 0.1); backdrop-filter: blur(4px); }
    .btn-premium.secondary:hover { background: rgba(255, 255, 255, 0.1); }

    .cta-group { display: flex; gap: 1rem; flex-wrap: nowrap; }

    /* ─── Shared Styles (Preserved) ──────────────────────── */
    /* ... (Variables and background styles same as before) ... */
    .hero-container { width: 100%; max-width: 1200px; position: relative; z-index: 10; }
    .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
    .hero-content { display: flex; flex-direction: column; gap: 2rem; }
    .hero-visual { position: relative; perspective: 1000px; display: flex; justify-content: center; }
    .hero-background { position: absolute; inset: 0; z-index: 0; }
    .orb { position: absolute; border-radius: 50%; filter: blur(80px); animation: float 10s ease-in-out infinite; }
    .orb-1 { width: 500px; height: 500px; background: rgba(139, 92, 246, 0.25); top: -10%; left: -10%; }
    .orb-2 { width: 400px; height: 400px; background: rgba(59, 130, 246, 0.2); bottom: -10%; right: -10%; animation-delay: 2s; }
    .grid-overlay { position: absolute; inset: 0; background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 30px 30px; opacity: 0.5; }

    .status-badge { display: inline-flex; align-items: center; gap: 0.75rem; padding: 0.5rem 1rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 9999px; backdrop-filter: blur(4px); }
    .status-indicator { position: relative; display: flex; height: 0.75rem; width: 0.75rem; }
    .ping { position: absolute; height: 100%; width: 100%; border-radius: 50%; background: #4ade80; opacity: 0.75; animation: ping 1s infinite; }
    .dot { position: relative; border-radius: 50%; height: 0.75rem; width: 0.75rem; background: #22c55e; }
    .status-text { font-size: 0.875rem; font-weight: 500; color: #cbd5e1; }
    
    .hero-headline { font-size: 3.5rem; font-weight: 800; line-height: 1.1; color: var(--text-white); margin: 0; }
    .gradient-text { background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .animate-gradient { animation: gradient 8s ease infinite; }
    .typing-container { display: flex; align-items: center; gap: 0.5rem; font-family: 'JetBrains Mono', monospace; font-size: 1.25rem; color: var(--text-slate); height: 2rem; }
    .highlight { color: #818cf8; font-weight: 600; }
    .cursor { width: 8px; height: 1.5rem; background: #818cf8; animation: blink 1s step-end infinite; }
    .hero-bio { font-size: 1.125rem; line-height: 1.75; color: var(--text-slate); max-width: 600px; }
    
    .glass-card { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 1rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); width: 100%; max-width: 500px; transform: rotateY(-10deg) rotateX(5deg); transition: transform 0.5s ease; }
    .glass-card:hover { transform: rotateY(0deg) rotateX(0deg); }
    .terminal-header { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; background: rgba(255, 255, 255, 0.05); border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
    .control { width: 0.75rem; height: 0.75rem; border-radius: 50%; } .red { background: #ef4444; } .yellow { background: #eab308; } .green { background: #22c55e; }
    .terminal-title { margin-left: auto; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #64748b; }
    .terminal-body { padding: 1.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: #e2e8f0; line-height: 1.6; }
    .code-line { display: flex; } .line-num { color: #475569; margin-right: 1rem; user-select: none; }
    .kwd { color: #c084fc; } .var { color: #fcd34d; } .str { color: #86efac; } .pun { color: #94a3b8; } .const { color: #60a5fa; } .indent { padding-left: 1.5rem; }
    
    .float-card { position: absolute; background: rgba(30, 41, 59, 0.9); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.1); padding: 1rem; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3); animation: float 6s ease-in-out infinite; }
    .exp-card { top: 10%; right: -2rem; animation-delay: 1s; } .proj-card { bottom: 15%; left: -3rem; animation-delay: 2s; }
    .float-content { display: flex; align-items: center; gap: 0.75rem; }
    .float-icon-box { padding: 0.5rem; border-radius: 8px; } .float-icon-box.blue { background: rgba(59, 130, 246, 0.2); color: #60a5fa; } .float-icon-box.purple { background: rgba(168, 85, 247, 0.2); color: #c084fc; }
    .float-label { font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; font-weight: 600; }
    .float-value { font-size: 1.125rem; font-weight: 700; color: white; }

    .about-section, .featured-section { padding: 6rem 2rem; border-bottom: 1px solid var(--border); }
    .section-label { display: inline-block; font-size: 0.875rem; font-weight: 600; color: var(--secondary); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.75rem; }
    .section-heading { font-size: 2.5rem; font-weight: 800; color: var(--text-white); margin-bottom: 1.5rem; line-height: 1.2; }
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
    .about-text { font-size: 1.1rem; color: var(--text-white); line-height: 1.8; margin-bottom: 1.5rem; opacity: 0.9; }
    .about-text.muted { color: var(--text-muted); font-size: 1rem; }
    .feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 2rem; }
    .feature-card { background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border); padding: 1.25rem; border-radius: 12px; transition: all 0.3s ease; }
    .feature-card:hover { border-color: var(--border-hover); transform: translateY(-3px); }
    .feature-icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
    .feature-title { font-weight: 700; color: var(--text-white); margin-bottom: 0.25rem; }
    .feature-desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; }
    .about-visual { display: flex; justify-content: center; }
    .profile-card-glass { background: rgba(30, 41, 59, 0.6); backdrop-filter: blur(12px); border: 1px solid var(--border); border-radius: 20px; padding: 2rem; width: 100%; max-width: 400px; position: relative; overflow: hidden; }
    .card-glow-bg { position: absolute; top: 0; right: 0; width: 200px; height: 200px; background: radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent 70%); pointer-events: none; }
    .profile-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
    .profile-icon { font-size: 2.5rem; background: rgba(255, 255, 255, 0.05); width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    .profile-name { font-size: 1.25rem; font-weight: 700; color: var(--text-white); margin-bottom: 0.25rem; }
    .profile-role { color: var(--secondary); font-size: 0.9rem; font-weight: 500; }
    .profile-stats { display: flex; flex-direction: column; gap: 1rem; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 1.5rem 0; margin-bottom: 1.5rem; }
    .stat-row { display: flex; justify-content: space-between; align-items: center; }
    .stat-label { color: var(--text-muted); font-size: 0.9rem; }
    .stat-val { color: var(--text-white); font-weight: 500; font-size: 0.95rem; }
    .stat-badge { background: rgba(34, 197, 94, 0.1); color: #4ade80; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.8rem; font-weight: 600; border: 1px solid rgba(34, 197, 94, 0.2); }
    .tech-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .tech-pills span { background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border); padding: 0.25rem 0.75rem; border-radius: 6px; font-size: 0.8rem; color: var(--text-muted); }

    /* ─── Featured Section Fixes ─────────────────────────── */
    .section-header-center { text-align: center; margin-bottom: 4rem; max-width: 700px; margin-left: auto; margin-right: auto; }
    .section-subtext { color: var(--text-muted); font-size: 1.1rem; }
    
    .featured-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 2rem; margin-bottom: 3rem; }
    .project-card-glass { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; transition: all 0.4s ease; height: 100%; display: flex; flex-direction: column; }
    .project-card-glass:hover { transform: translateY(-8px); border-color: var(--border-hover); box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.4); }
    
    .project-visual { height: 220px; position: relative; overflow: hidden; }
    .project-visual.grad-0 { background: linear-gradient(135deg, #4f46e5, #ec4899); }
    .project-visual.grad-1 { background: linear-gradient(135deg, #0ea5e9, #10b981); }
    .project-visual.grad-2 { background: linear-gradient(135deg, #f59e0b, #ef4444); }
    .project-visual.grad-3 { background: linear-gradient(135deg, #8b5cf6, #6366f1); }
    
    .visual-overlay { position: absolute; inset: 0; background: rgba(15, 23, 42, 0.3); transition: opacity 0.3s ease; }
    .project-card-glass:hover .visual-overlay { opacity: 0; }
    .visual-icon { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 2; opacity: 0.9; }

    .project-content { padding: 1.5rem; display: flex; flex-direction: column; flex-grow: 1; }
    .project-title { font-size: 1.35rem; font-weight: 700; color: var(--text-white); margin-bottom: 0.5rem; }
    .project-desc { font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem; flex-grow: 1; }
    
    .project-tech { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
    .tech-badge { font-size: 0.75rem; padding: 0.25rem 0.6rem; background: rgba(255, 255, 255, 0.05); border-radius: 6px; color: var(--text-muted); border: 1px solid var(--border); }
    
    /* Live Preview Button Styles */
    .project-links { display: flex; gap: 0.75rem; margin-top: auto; }
    .link-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.7rem; border-radius: 8px; font-size: 0.9rem; font-weight: 600; transition: all 0.3s ease; text-decoration: none; }
    
    .link-btn.github { background: rgba(255, 255, 255, 0.05); color: var(--text-white); border: 1px solid var(--border); }
    .link-btn.github:hover { background: rgba(255, 255, 255, 0.1); border-color: var(--text-white); }
    
    .link-btn.live { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: 1px solid transparent; box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3); }
    .link-btn.live:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(99, 102, 241, 0.5); }
    
    .view-more-container { text-align: center; }

    /* ─── Animations ─────────────────────────────────────── */
    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
    @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
    @keyframes blink { 50% { opacity: 0; } }
    @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    .fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; transform: translateY(20px); }
    @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
    .delay-1 { animation-delay: 0.1s; } .delay-2 { animation-delay: 0.2s; } .delay-3 { animation-delay: 0.3s; }

    /* ─── Responsive ─────────────────────────────────────── */
    @media (max-width: 1024px) {
      .hero-grid, .about-grid { grid-template-columns: 1fr; }
      .hero-grid { text-align: center; }
      .hero-visual, .about-visual { display: flex; justify-content: center; margin-top: 3rem; }
      .hero-content { align-items: center; }
      .cta-group { justify-content: center; flex-wrap: wrap; }
      .project-links { flex-direction: column; }
    }
  `]
})
export class HomeComponent implements OnInit {
  profile: Profile | null = null;
  featuredProjects: Project[] = [];

  // Typing Effect
  typingWords = ['Microservices', 'Microfrontends', 'Angular Apps', '.NET APIs', 'Cloud Systems'];
  currentTypingWord = '';
  wordIndex = 0;
  charIndex = 0;
  isDeleting = false;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    // Load Profile from Firebase
    this.firebaseService.getProfile().subscribe(p => this.profile = p);

    // Load Projects from Firebase
    this.firebaseService.getProjects().subscribe(projects => {
      // Filter for featured projects and take top 3
      this.featuredProjects = projects
        .filter(p => p.featured)
        .slice(0, 3);
    });

    this.typeEffect();
  }

  typeEffect() {
    const currentWord = this.typingWords[this.wordIndex];
    if (this.isDeleting) {
      this.currentTypingWord = currentWord.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.currentTypingWord = currentWord.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = this.isDeleting ? 50 : 100;

    if (!this.isDeleting && this.charIndex === currentWord.length) {
      typeSpeed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.typingWords.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.typeEffect(), typeSpeed);
  }

  getGradientClass(index: number): string {
    return `grad-${index % 4}`;
  }
}
