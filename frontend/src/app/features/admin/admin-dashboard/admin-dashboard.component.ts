import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { Project, Skill, ContactMessage } from '../../../core/models/portfolio.models';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
    template: `
    <section class="admin-section">
      <!-- Admin Header -->
      <div class="admin-header">
        <h1>Admin <span class="gradient-text">Dashboard</span></h1>
        <button class="btn btn-secondary" (click)="logout()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </div>

      <!-- Tab Navigation -->
      <div class="admin-tabs">
        <button *ngFor="let tab of tabs"
                class="tab-btn"
                [class.active]="activeTab === tab.key"
                (click)="activeTab = tab.key">
          <span [innerHTML]="tab.icon"></span>
          {{ tab.label }}
          <span class="tab-count" *ngIf="tab.count">{{ tab.count }}</span>
        </button>
      </div>

      <!-- Projects Management -->
      <div *ngIf="activeTab === 'projects'" class="tab-content">
        <div class="content-header">
          <h2>Manage Projects</h2>
          <button class="btn btn-primary" (click)="showProjectForm = !showProjectForm">
            {{ showProjectForm ? 'Cancel' : '+ Add Project' }}
          </button>
        </div>

        <!-- Project Form -->
        <div class="form-card" *ngIf="showProjectForm">
          <form [formGroup]="projectForm" (ngSubmit)="saveProject()">
            <div class="form-row">
              <div class="form-group">
                <label>Title</label>
                <input type="text" formControlName="title" placeholder="Project Title">
              </div>
              <div class="form-group">
                <label>Category</label>
                <input type="text" formControlName="category" placeholder="Enterprise">
              </div>
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea formControlName="description" rows="3" placeholder="Brief description..."></textarea>
            </div>
            <div class="form-group">
              <label>Tech Stack (comma separated)</label>
              <input type="text" formControlName="techStack" placeholder="Angular, .NET 8, SQL Server">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>GitHub URL</label>
                <input type="url" formControlName="githubUrl" placeholder="https://github.com/...">
              </div>
              <div class="form-group">
                <label>Live URL</label>
                <input type="url" formControlName="liveUrl" placeholder="https://...">
              </div>
            </div>
            <div class="form-actions">
              <label class="checkbox-label">
                <input type="checkbox" formControlName="featured">
                Featured Project
              </label>
              <button type="submit" class="btn btn-primary">Save Project</button>
            </div>
          </form>
        </div>

        <!-- Projects List -->
        <div class="items-list">
          <div class="item-card" *ngFor="let project of projects">
            <div class="item-info">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="item-tags">
                <span class="tech-tag" *ngFor="let tech of project.techStack">{{ tech }}</span>
              </div>
            </div>
            <div class="item-actions">
              <button class="action-btn edit" (click)="editProject(project)" title="Edit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button class="action-btn delete" (click)="deleteProject(project.id!)" title="Delete">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Management -->
      <div *ngIf="activeTab === 'skills'" class="tab-content">
        <div class="content-header">
          <h2>Manage Skills</h2>
          <button class="btn btn-primary" (click)="showSkillForm = !showSkillForm">
            {{ showSkillForm ? 'Cancel' : '+ Add Skill' }}
          </button>
        </div>

        <div class="form-card" *ngIf="showSkillForm">
          <form [formGroup]="skillForm" (ngSubmit)="saveSkill()">
            <div class="form-row">
              <div class="form-group">
                <label>Skill Name</label>
                <input type="text" formControlName="name" placeholder="Angular">
              </div>
              <div class="form-group">
                <label>Category</label>
                <input type="text" formControlName="category" placeholder="Frontend">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Proficiency (0-100)</label>
                <input type="number" formControlName="proficiency" min="0" max="100">
              </div>
              <div class="form-group">
                <label>Order</label>
                <input type="number" formControlName="order">
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Save Skill</button>
          </form>
        </div>

        <div class="items-list">
          <div class="item-card" *ngFor="let skill of skills">
            <div class="item-info">
              <h3>{{ skill.name }}</h3>
              <p>{{ skill.category }} · {{ skill.proficiency }}%</p>
            </div>
            <div class="item-actions">
              <button class="action-btn delete" (click)="deleteSkill(skill.id!)" title="Delete">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Messages -->
      <div *ngIf="activeTab === 'messages'" class="tab-content">
        <div class="content-header">
          <h2>Messages & Feedback</h2>
          <span class="unread-badge" *ngIf="unreadCount > 0">{{ unreadCount }} unread</span>
        </div>

        <div class="items-list">
          <div class="message-card" *ngFor="let msg of messages"
               [class.unread]="!msg.read">
            <div class="msg-header">
              <div class="msg-sender">
                <strong>{{ msg.name }}</strong>
                <span class="msg-email">{{ msg.email }}</span>
              </div>
              <span class="msg-date">{{ msg.createdAt | date:'short' }}</span>
            </div>
            <h4 class="msg-subject">{{ msg.subject }}</h4>
            <p class="msg-body">{{ msg.message }}</p>
            <div class="msg-actions">
              <button class="action-btn" *ngIf="!msg.read" (click)="markAsRead(msg.id!)" title="Mark as read">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Mark Read
              </button>
              <button class="action-btn delete" (click)="deleteMessage(msg.id!)" title="Delete">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
                Delete
              </button>
            </div>
          </div>

          <div class="empty-state" *ngIf="messages.length === 0">
            <p>No messages yet. Share your portfolio to get feedback! 📬</p>
          </div>
        </div>
      </div>
    </section>
  `,
    styles: [`
    .admin-section {
      max-width: 1000px;
      margin: 0 auto;
      padding: 6rem 2rem 4rem;
    }

    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .admin-header h1 {
      font-size: 2rem;
    }

    /* ─── Tabs ────────────────────────────────────────────── */
    .admin-tabs {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 2rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 0.5rem;
      overflow-x: auto;
    }

    .tab-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.2rem;
      border: none;
      background: transparent;
      color: var(--text-secondary);
      font-weight: 500;
      font-size: 0.9rem;
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.3s ease;
      white-space: nowrap;
    }

    .tab-btn:hover {
      background: var(--hover-bg);
      color: var(--text-primary);
    }

    .tab-btn.active {
      background: var(--accent-gradient);
      color: white;
    }

    .tab-count {
      background: rgba(255, 255, 255, 0.2);
      padding: 0.1rem 0.5rem;
      border-radius: 10px;
      font-size: 0.75rem;
    }

    /* ─── Content ─────────────────────────────────────────── */
    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .content-header h2 {
      font-size: 1.3rem;
    }

    .unread-badge {
      background: var(--error);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 10px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    /* ─── Form Card ───────────────────────────────────────── */
    .form-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 2rem;
      margin-bottom: 2rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.4rem;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 0.75rem 1rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      color: var(--text-primary);
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.3s;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      border-color: var(--accent-color);
    }

    .form-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: var(--text-secondary);
      cursor: pointer;
    }

    /* ─── Items List ──────────────────────────────────────── */
    .items-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .item-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.25rem;
      transition: all 0.3s ease;
    }

    .item-card:hover {
      border-color: var(--border-color-hover);
    }

    .item-info h3 {
      font-size: 1rem;
      margin-bottom: 0.25rem;
    }

    .item-info p {
      font-size: 0.85rem;
      color: var(--text-secondary);
    }

    .item-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.3rem;
      margin-top: 0.5rem;
    }

    .tech-tag {
      font-size: 0.7rem;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      background: var(--bg-tertiary);
      color: var(--text-muted);
    }

    .item-actions {
      display: flex;
      gap: 0.5rem;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.4rem 0.6rem;
      border-radius: 8px;
      border: 1px solid var(--border-color);
      background: transparent;
      color: var(--text-secondary);
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .action-btn:hover {
      background: var(--hover-bg);
      color: var(--accent-color);
    }

    .action-btn.delete:hover {
      background: rgba(239, 68, 68, 0.1);
      border-color: var(--error);
      color: var(--error);
    }

    .action-btn.edit:hover {
      background: var(--hover-bg);
      border-color: var(--accent-color);
    }

    /* ─── Messages ────────────────────────────────────────── */
    .message-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.5rem;
      transition: all 0.3s ease;
    }

    .message-card.unread {
      border-left: 3px solid var(--accent-color);
      background: var(--bg-card-hover);
    }

    .msg-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }

    .msg-sender strong {
      margin-right: 0.5rem;
    }

    .msg-email {
      color: var(--text-muted);
      font-size: 0.8rem;
    }

    .msg-date {
      color: var(--text-muted);
      font-size: 0.8rem;
    }

    .msg-subject {
      font-size: 1rem;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }

    .msg-body {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .msg-actions {
      display: flex;
      gap: 0.5rem;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: var(--text-muted);
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }

      .admin-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }

      .admin-tabs {
        overflow-x: auto;
      }
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
    activeTab = 'projects';
    showProjectForm = false;
    showSkillForm = false;

    projects: Project[] = [];
    skills: Skill[] = [];
    messages: ContactMessage[] = [];
    unreadCount = 0;

    editingProjectId: string | null = null;

    projectForm: FormGroup;
    skillForm: FormGroup;

    tabs = [
        { key: 'projects', label: 'Projects', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>', count: 0 },
        { key: 'skills', label: 'Skills', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>', count: 0 },
        { key: 'messages', label: 'Messages', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>', count: 0 }
    ];

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private portfolioService: PortfolioService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.projectForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            category: [''],
            techStack: [''],
            githubUrl: [''],
            liveUrl: [''],
            featured: [false]
        });

        this.skillForm = this.fb.group({
            name: ['', Validators.required],
            category: ['', Validators.required],
            proficiency: [80, [Validators.required, Validators.min(0), Validators.max(100)]],
            order: [1]
        });
    }

    ngOnInit(): void {
        this.loadData();
    }

    /** Load all admin data */
    private loadData(): void {
        this.portfolioService.loadProjects().subscribe(p => {
            this.projects = p;
            this.tabs[0].count = p.length;
        });

        this.portfolioService.loadSkills().subscribe(s => {
            this.skills = s;
            this.tabs[1].count = s.length;
        });

        this.portfolioService.getMessages().subscribe({
            next: msgs => {
                this.messages = msgs;
                this.unreadCount = msgs.filter(m => !m.read).length;
                this.tabs[2].count = this.unreadCount;
            },
            error: () => {
                this.messages = [];
            }
        });
    }

    /** Save or update a project */
    saveProject(): void {
        if (this.projectForm.invalid) return;

        const formValue = this.projectForm.value;
        const project: Project = {
            ...formValue,
            techStack: formValue.techStack.split(',').map((t: string) => t.trim()).filter((t: string) => t),
            order: this.projects.length + 1
        };

        if (this.editingProjectId) {
            this.portfolioService.updateProject(this.editingProjectId, project).subscribe({
                next: () => {
                    this.snackBar.open('Project updated! ✅', 'Close', { duration: 3000 });
                    this.loadData();
                    this.resetProjectForm();
                },
                error: () => this.snackBar.open('Failed to update project', 'Close', { duration: 3000 })
            });
        } else {
            this.portfolioService.createProject(project).subscribe({
                next: () => {
                    this.snackBar.open('Project created! 🎉', 'Close', { duration: 3000 });
                    this.loadData();
                    this.resetProjectForm();
                },
                error: () => this.snackBar.open('Failed to create project', 'Close', { duration: 3000 })
            });
        }
    }

    /** Edit an existing project */
    editProject(project: Project): void {
        this.editingProjectId = project.id || null;
        this.showProjectForm = true;
        this.projectForm.patchValue({
            ...project,
            techStack: project.techStack.join(', ')
        });
    }

    /** Delete a project */
    deleteProject(id: string): void {
        if (confirm('Are you sure you want to delete this project?')) {
            this.portfolioService.deleteProject(id).subscribe({
                next: () => {
                    this.snackBar.open('Project deleted', 'Close', { duration: 3000 });
                    this.loadData();
                }
            });
        }
    }

    /** Reset project form */
    private resetProjectForm(): void {
        this.projectForm.reset();
        this.showProjectForm = false;
        this.editingProjectId = null;
    }

    /** Save a skill */
    saveSkill(): void {
        if (this.skillForm.invalid) return;

        this.portfolioService.createSkill(this.skillForm.value).subscribe({
            next: () => {
                this.snackBar.open('Skill added! ✅', 'Close', { duration: 3000 });
                this.loadData();
                this.skillForm.reset({ proficiency: 80, order: 1 });
                this.showSkillForm = false;
            },
            error: () => this.snackBar.open('Failed to add skill', 'Close', { duration: 3000 })
        });
    }

    /** Delete a skill */
    deleteSkill(id: string): void {
        if (confirm('Are you sure?')) {
            this.portfolioService.deleteSkill(id).subscribe({
                next: () => {
                    this.snackBar.open('Skill deleted', 'Close', { duration: 3000 });
                    this.loadData();
                }
            });
        }
    }

    /** Mark a message as read */
    markAsRead(id: string): void {
        this.portfolioService.markMessageRead(id).subscribe({
            next: () => this.loadData()
        });
    }

    /** Delete a message */
    deleteMessage(id: string): void {
        if (confirm('Delete this message?')) {
            this.portfolioService.deleteMessage(id).subscribe({
                next: () => {
                    this.snackBar.open('Message deleted', 'Close', { duration: 3000 });
                    this.loadData();
                }
            });
        }
    }

    /** Logout */
    logout(): void {
        this.authService.logout();
        this.router.navigate(['/']);
    }
}
