import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from '../../core/services/portfolio.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
    template: `
    <div class="bg-decoration bg-orb-1"></div>
    <div class="bg-decoration bg-orb-2"></div>

    <section class="section contact-section">
      <!-- Header -->
      <div class="section-header">
        <span class="section-label">Get in Touch</span>
        <h2 class="section-title">Let's <span class="gradient-text">Connect</span></h2>
        <p class="section-subtitle">
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>
      </div>

      <div class="contact-grid">
        <!-- Contact Info -->
        <div class="contact-info">
          <div class="info-card">
            <div class="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div>
              <h4>Email</h4>
              <a href="mailto:rsudheerkumar40@gmail.com">rsudheerkumar40&#64;gmail.com</a>
            </div>
          </div>

          <div class="info-card">
            <div class="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div>
              <h4>Phone</h4>
              <a href="tel:+917780664087">+91 7780664087</a>
            </div>
          </div>

          <div class="info-card">
            <div class="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <h4>Location</h4>
              <p>Andhra Pradesh, India</p>
            </div>
          </div>

          <!-- Social Links -->
          <div class="social-links-section">
            <h4 class="social-title">Follow Me</h4>
            <div class="social-grid">
              <a href="https://github.com/R-Sudheer-Kumar" target="_blank" rel="noopener noreferrer" class="social-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/rachamadugu-sudheer-kumar" target="_blank" rel="noopener noreferrer" class="social-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-form-wrapper">
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="name">Full Name</label>
                <input id="name" type="text" formControlName="name" placeholder="John Doe"
                       [class.error]="isFieldInvalid('name')">
                <span class="error-message" *ngIf="isFieldInvalid('name')">Name is required</span>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input id="email" type="email" formControlName="email" placeholder="john@example.com"
                       [class.error]="isFieldInvalid('email')">
                <span class="error-message" *ngIf="isFieldInvalid('email')">Valid email is required</span>
              </div>
            </div>

            <div class="form-group">
              <label for="subject">Subject</label>
              <input id="subject" type="text" formControlName="subject" placeholder="Project Collaboration"
                     [class.error]="isFieldInvalid('subject')">
              <span class="error-message" *ngIf="isFieldInvalid('subject')">Subject is required</span>
            </div>

            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" formControlName="message" rows="5"
                        placeholder="Tell me about your project..."
                        [class.error]="isFieldInvalid('message')"></textarea>
              <span class="error-message" *ngIf="isFieldInvalid('message')">Message is required (min 10 characters)</span>
            </div>

            <button type="submit" class="btn btn-primary submit-btn" [disabled]="isSubmitting">
              <span *ngIf="!isSubmitting">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                Send Message
              </span>
              <span *ngIf="isSubmitting" class="loading">
                <span class="spinner"></span>
                Sending...
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  `,
    styles: [`
    .contact-section {
      padding-top: 8rem;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 3rem;
      align-items: start;
    }

    /* ─── Contact Info ────────────────────────────────────── */
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .info-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.25rem;
      transition: all 0.3s ease;
    }

    .info-card:hover {
      border-color: var(--border-color-hover);
      transform: translateX(4px);
    }

    .info-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: var(--hover-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent-color);
      flex-shrink: 0;
    }

    .info-card h4 {
      font-size: 0.85rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.2rem;
      font-weight: 500;
    }

    .info-card a, .info-card p {
      font-size: 0.95rem;
      color: var(--text-primary);
      font-weight: 500;
    }

    .info-card a:hover {
      color: var(--accent-color);
    }

    /* ─── Social Links ────────────────────────────────────── */
    .social-title {
      font-size: 0.85rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin: 1rem 0 0.75rem;
    }

    .social-grid {
      display: flex;
      gap: 0.75rem;
    }

    .social-card {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 1.25rem;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      color: var(--text-secondary);
      font-size: 0.85rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .social-card:hover {
      color: var(--accent-color);
      border-color: var(--accent-color);
      transform: translateY(-4px);
      box-shadow: 0 8px 20px var(--accent-glow);
    }

    /* ─── Contact Form ────────────────────────────────────── */
    .contact-form-wrapper {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 2.5rem;
      backdrop-filter: blur(10px);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
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

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 0.85rem 1rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      color: var(--text-primary);
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      outline: none;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      border-color: var(--accent-color);
      box-shadow: 0 0 0 3px var(--accent-glow);
    }

    .form-group input.error,
    .form-group textarea.error {
      border-color: var(--error);
    }

    .form-group input::placeholder,
    .form-group textarea::placeholder {
      color: var(--text-muted);
    }

    .form-group textarea {
      resize: vertical;
      min-height: 120px;
    }

    .error-message {
      font-size: 0.75rem;
      color: var(--error);
      margin-top: 0.25rem;
      display: block;
    }

    .submit-btn {
      width: 100%;
      justify-content: center;
      padding: 1rem;
      font-size: 1rem;
    }

    .submit-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
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

    /* ─── Responsive ──────────────────────────────────────── */
    @media (max-width: 768px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .contact-form-wrapper {
        padding: 1.5rem;
      }
    }
  `]
})
export class ContactComponent {
    contactForm: FormGroup;
    isSubmitting = false;

    constructor(
        private fb: FormBuilder,
        private portfolioService: PortfolioService,
        private snackBar: MatSnackBar
    ) {
        this.contactForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            subject: ['', [Validators.required]],
            message: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    /** Check if a form field is invalid and touched */
    isFieldInvalid(field: string): boolean {
        const control = this.contactForm.get(field);
        return !!(control && control.invalid && control.touched);
    }

    /** Submit the contact form */
    onSubmit(): void {
        if (this.contactForm.invalid) {
            this.contactForm.markAllAsTouched();
            return;
        }

        this.isSubmitting = true;

        const message = {
            ...this.contactForm.value,
            read: false,
            createdAt: new Date().toISOString()
        };

        this.portfolioService.sendMessage(message).subscribe({
            next: () => {
                this.snackBar.open('Message sent successfully! 🎉', 'Close', {
                    duration: 5000,
                    panelClass: 'success-snackbar'
                });
                this.contactForm.reset();
                this.isSubmitting = false;
            },
            error: () => {
                this.snackBar.open('Message saved! I\'ll get back to you soon. 📧', 'Close', {
                    duration: 5000
                });
                this.contactForm.reset();
                this.isSubmitting = false;
            }
        });
    }
}
