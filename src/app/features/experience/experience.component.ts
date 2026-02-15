import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../core/services/firebase.service';
import { Experience } from '../../core/models/portfolio.models';

@Component({
    selector: 'app-experience',
    standalone: true,
    imports: [CommonModule],
    encapsulation: ViewEncapsulation.None,
    template: `
    <section class="min-h-screen bg-[#020617] text-slate-200 py-20 relative overflow-hidden">
        <!-- Background Decor -->
        <div class="absolute inset-0 pointer-events-none">
            <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
            <div class="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]"></div>
        </div>

        <div class="container mx-auto px-4 relative z-10 max-w-6xl">
            <!-- Header -->
            <div class="text-center mb-20 animate-fade-in-up">
                <span class="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-bold tracking-wider uppercase mb-4 border border-indigo-500/20">
                    Career Path
                </span>
                <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                    Professional Experience
                </h2>
                <p class="text-slate-400 max-w-2xl mx-auto text-lg">
                    Building scalable solutions and driving technical excellence across impactful projects.
                </p>
            </div>

            <!-- Timeline Container -->
            <div class="relative">
                <!-- Vertical Line -->
                <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-slate-800 md:-translate-x-1/2 h-full"></div>
                
                <!-- Experience Items -->
                <div *ngFor="let exp of experiences; let i = index; let isLast = last" 
                     class="relative mb-16 md:mb-24 flex flex-col md:flex-row items-center group"
                     [ngClass]="{'md:flex-row-reverse': i % 2 !== 0}">
                     
                    <!-- Timeline Dot -->
                    <div class="absolute left-4 md:left-1/2 w-4 h-4 bg-slate-950 border-2 border-indigo-500 rounded-full z-20 md:-translate-x-1/2 mt-1.5 shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:scale-125 transition-transform duration-300">
                        <div class="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20"></div>
                    </div>

                    <!-- Date Badge (Desktop: Opposite side) -->
                    <div class="hidden md:block w-1/2 px-10 text-right" [ngClass]="{'text-left': i % 2 !== 0, 'text-right': i % 2 === 0}">
                         <div class="inline-flex flex-col" [ngClass]="{'items-start': i % 2 !== 0, 'items-end': i % 2 === 0}">
                            <span class="text-2xl font-bold text-slate-200">{{ getYear(exp.startDate) }}</span>
                            <span class="text-indigo-400 font-medium text-sm">{{ getMonth(exp.startDate) }} - {{ exp.current ? 'Present' : getMonth(exp.endDate!) + ' ' + getYear(exp.endDate!) }}</span>
                            <span class="mt-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs text-slate-400 backdrop-blur-sm">
                                {{ getDuration(exp.startDate, exp.endDate, exp.current) }}
                            </span>
                         </div>
                    </div>

                    <!-- Content Card -->
                    <div class="w-full md:w-1/2 pl-12 md:pl-0 md:px-10 mt-4 md:mt-0">
                        <div class="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 transform group-hover:-translate-y-1 relative overflow-hidden">
                            
                            <!-- Card Glow Gradient -->
                            <div class="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors"></div>

                            <!-- Header -->
                            <div class="flex justify-between items-start mb-6 relative">
                                <div>
                                    <h3 class="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{{ exp.role }}</h3>
                                    <div class="text-lg text-indigo-300 font-medium flex items-center gap-2">
                                        {{ exp.company }}
                                        <span *ngIf="exp.location" class="text-slate-500 text-sm font-normal">• {{ exp.location }}</span>
                                    </div>
                                    <!-- Mobile Date (Visible only on mobile) -->
                                    <div class="md:hidden mt-2 text-sm text-slate-400">
                                        {{ formatDate(exp.startDate) }} — {{ exp.current ? 'Present' : formatDate(exp.endDate!) }}
                                    </div>
                                </div>
                                <!-- Logo Placeholder -->
                                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrinking-0">
                                    <span class="text-lg font-bold text-indigo-500">{{ exp.company.substring(0,2).toUpperCase() }}</span>
                                </div>
                            </div>

                            <!-- Description -->
                            <p class="text-slate-400 mb-6 leading-relaxed relative z-10">
                                {{ exp.description }}
                            </p>

                            <!-- Responsibilities -->
                            <ul class="space-y-3 mb-6 relative z-10">
                                <li *ngFor="let resp of exp.responsibilities" class="flex items-start gap-3 text-slate-300 text-sm">
                                    <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
                                    <span class="leading-relaxed">{{ resp }}</span>
                                </li>
                            </ul>

                            <!-- Tech Stack -->
                            <div class="flex flex-wrap gap-2 pt-4 border-t border-slate-800/50 relative z-10">
                                <span *ngFor="let tech of exp.techUsed" 
                                      class="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-medium text-slate-400 hover:text-white hover:border-indigo-500/50 transition-colors cursor-default">
                                    {{ tech }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Education Section -->
            <div class="mt-32">
                 <div class="text-center mb-16">
                    <h3 class="text-3xl font-bold text-white mb-4">Education & Credentials</h3>
                    <div class="h-1 w-20 bg-indigo-500 mx-auto rounded-full"></div>
                 </div>

                 <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <!-- Degree 1 -->
                     <div class="bg-slate-900/30 backdrop-blur border border-slate-800 rounded-2xl p-6 flex items-start gap-4 hover:bg-slate-900/50 transition-colors group">
                        <div class="w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🎓</div>
                        <div>
                            <h4 class="text-lg font-bold text-white">B.Tech in CSE (Data Science)</h4>
                            <div class="text-indigo-400">JNTU Kakinada</div>
                            <div class="text-slate-500 text-sm mt-1">2020 - 2024 • CGPA: 7.90</div>
                        </div>
                     </div>

                     <!-- Degree 2 -->
                     <div class="bg-slate-900/30 backdrop-blur border border-slate-800 rounded-2xl p-6 flex items-start gap-4 hover:bg-slate-900/50 transition-colors group">
                        <div class="w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🏫</div>
                        <div>
                            <h4 class="text-lg font-bold text-white">Intermediate (MPC)</h4>
                            <div class="text-indigo-400">State Board of Intermediate Education</div>
                            <div class="text-slate-500 text-sm mt-1">2018 - 2020 • CGPA: 9.57</div>
                        </div>
                     </div>
                 </div>
                 
                 <!-- Certifications -->
                 <div class="mt-20">
                    <h4 class="text-xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
                        <span class="text-indigo-500">❖</span> 
                        Certifications & Licenses
                    </h4>
                    
                    <div class="flex flex-col gap-4 max-w-3xl mx-auto">
                        <div *ngFor="let cert of certifications" 
                             class="group relative bg-slate-900/40 backdrop-blur border border-slate-800 rounded-xl p-4 flex items-center justify-between hover:bg-slate-900/60 hover:border-indigo-500/30 transition-all duration-300 overflow-hidden">
                            
                            <!-- Hover Glow -->
                            <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div class="flex items-center gap-4 relative z-10">
                                <div class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                    📜
                                </div>
                                <div class="flex flex-col">
                                    <span class="font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">{{ cert.name }}</span>
                                    <span class="text-xs text-slate-500 font-medium tracking-wider uppercase flex items-center gap-1">
                                        {{ cert.issuer }}
                                    </span>
                                </div>
                            </div>

                            <div class="relative z-10 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                <svg class="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    </section>
  `,
    styles: [`
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
    }
  `]
})
export class ExperienceComponent implements OnInit {
    experiences: Experience[] = [];

    certifications = [
        { name: 'Python 101 for Data Science', issuer: 'IBM' },
        { name: 'NumPy and Pandas in Python', issuer: 'Udemy' },
        { name: 'Front End Development', issuer: 'IBM' },
        { name: 'Data Science', issuer: 'Internship' }
    ];

    constructor(private firebaseService: FirebaseService) { }

    ngOnInit(): void {
        this.firebaseService.getExperience().subscribe(exps => {
            // Sort: Newest first usually for timeline
            this.experiences = exps.sort((a, b) => {
                const d1 = new Date(a.startDate).getTime();
                const d2 = new Date(b.startDate).getTime();
                return d2 - d1; // Descending
            });
        });
    }

    formatDate(dateStr: string): string {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }

    getYear(dateStr: string): string {
        return new Date(dateStr).getFullYear().toString();
    }

    getMonth(dateStr: string): string {
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short' });
    }

    getDuration(startDate: string, endDate?: string, current?: boolean): string {
        const start = new Date(startDate);
        const end = current || !endDate ? new Date() : new Date(endDate);

        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1; // +1 to include partial month
        const years = Math.floor(months / 12);
        const m = months % 12;

        if (months < 1) return '1m';

        let duration = '';
        if (years > 0) duration += `${years} yr `;
        if (m > 0) duration += `${m} mos`;

        return duration.trim();
    }
}
