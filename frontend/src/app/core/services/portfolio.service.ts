import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, catchError, tap } from 'rxjs';
import {
    Project, Skill, Experience, ContactMessage,
    Profile, ApiResponse
} from '../models/portfolio.models';
import { environment } from '../../../environments/environment';

/**
 * Central service for all portfolio data operations.
 * Communicates with FastAPI backend for CRUD operations.
 * Implements caching for frequently accessed data.
 */
@Injectable({ providedIn: 'root' })
export class PortfolioService {
    private readonly apiUrl = environment.apiUrl;

    // Cached data subjects
    private profileSubject = new BehaviorSubject<Profile | null>(null);
    private projectsSubject = new BehaviorSubject<Project[]>([]);
    private skillsSubject = new BehaviorSubject<Skill[]>([]);
    private experiencesSubject = new BehaviorSubject<Experience[]>([]);

    /** Observable streams for components to subscribe to */
    profile$ = this.profileSubject.asObservable();
    projects$ = this.projectsSubject.asObservable();
    skills$ = this.skillsSubject.asObservable();
    experiences$ = this.experiencesSubject.asObservable();

    constructor(private http: HttpClient) { }

    // ─── Profile ───────────────────────────────────────────

    /** Fetch profile data from API */
    loadProfile(): Observable<Profile> {
        return this.http.get<Profile>(`${this.apiUrl}/profile`).pipe(
            tap(profile => this.profileSubject.next(profile)),
            catchError(() => {
                const fallback = this.getDefaultProfile();
                this.profileSubject.next(fallback);
                return of(fallback);
            })
        );
    }

    // ─── Projects ──────────────────────────────────────────

    /** Fetch all projects */
    loadProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(`${this.apiUrl}/projects`).pipe(
            tap(projects => this.projectsSubject.next(projects)),
            catchError(() => {
                const fallback = this.getDefaultProjects();
                this.projectsSubject.next(fallback);
                return of(fallback);
            })
        );
    }

    /** Create a new project (admin) */
    createProject(project: Project): Observable<Project> {
        return this.http.post<Project>(`${this.apiUrl}/projects`, project);
    }

    /** Update an existing project (admin) */
    updateProject(id: string, project: Partial<Project>): Observable<Project> {
        return this.http.put<Project>(`${this.apiUrl}/projects/${id}`, project);
    }

    /** Delete a project (admin) */
    deleteProject(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/projects/${id}`);
    }

    // ─── Skills ────────────────────────────────────────────

    /** Fetch all skills */
    loadSkills(): Observable<Skill[]> {
        return this.http.get<Skill[]>(`${this.apiUrl}/skills`).pipe(
            tap(skills => this.skillsSubject.next(skills)),
            catchError(() => {
                const fallback = this.getDefaultSkills();
                this.skillsSubject.next(fallback);
                return of(fallback);
            })
        );
    }

    /** Create a new skill (admin) */
    createSkill(skill: Skill): Observable<Skill> {
        return this.http.post<Skill>(`${this.apiUrl}/skills`, skill);
    }

    /** Update a skill (admin) */
    updateSkill(id: string, skill: Partial<Skill>): Observable<Skill> {
        return this.http.put<Skill>(`${this.apiUrl}/skills/${id}`, skill);
    }

    /** Delete a skill (admin) */
    deleteSkill(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/skills/${id}`);
    }

    // ─── Experience ────────────────────────────────────────

    /** Fetch all experiences */
    loadExperiences(): Observable<Experience[]> {
        return this.http.get<Experience[]>(`${this.apiUrl}/experiences`).pipe(
            tap(exps => this.experiencesSubject.next(exps)),
            catchError(() => {
                const fallback = this.getDefaultExperiences();
                this.experiencesSubject.next(fallback);
                return of(fallback);
            })
        );
    }

    // ─── Contact ───────────────────────────────────────────

    /** Send a contact message */
    sendMessage(message: ContactMessage): Observable<ContactMessage> {
        return this.http.post<ContactMessage>(`${this.apiUrl}/contact`, message);
    }

    /** Get all messages (admin) */
    getMessages(): Observable<ContactMessage[]> {
        return this.http.get<ContactMessage[]>(`${this.apiUrl}/contact`);
    }

    /** Mark message as read (admin) */
    markMessageRead(id: string): Observable<void> {
        return this.http.patch<void>(`${this.apiUrl}/contact/${id}/read`, {});
    }

    /** Delete a message (admin) */
    deleteMessage(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/contact/${id}`);
    }

    // ─── Default/Fallback Data ─────────────────────────────

    /** Default profile when API is unavailable */
    private getDefaultProfile(): Profile {
        return {
            name: 'R. Sudheer Kumar',
            title: 'Full Stack Developer',
            tagline: 'Building Modern Web Experiences with Angular, .NET & Cloud Technologies',
            bio: 'Enthusiastic, self-motivated, and reliable full-stack developer with expertise in microfrontends, microservices, and modern web technologies. Currently working at Snovasys Software Solutions, contributing to enterprise-grade applications using Angular, .NET 8, SQL Server, and MongoDB.',
            email: 'rsudheerkumar40@gmail.com',
            phone: '+91 7780664087',
            location: 'Andhra Pradesh, India',
            resumeUrl: '/assets/resume/SudheerKumar_Resume.pdf',
            socialLinks: [
                { platform: 'GitHub', url: 'https://github.com/R-Sudheer-Kumar', icon: 'github' },
                { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/rachamadugu-sudheer-kumar', icon: 'linkedin' }
            ]
        };
    }

    /** Default projects when API is unavailable */
    private getDefaultProjects(): Project[] {
        return [
            {
                id: '1',
                title: 'FieldStaff Management System',
                description: 'Enterprise field staff management application with real-time tracking, task assignment, and reporting capabilities.',
                longDescription: 'A comprehensive group project built using Angular for the frontend, .NET 8 for the backend API, with SQL Server and MongoDB for data persistence. Features include real-time staff tracking, automated task distribution, performance analytics, and role-based access control.',
                techStack: ['Angular', '.NET 8', 'SQL Server', 'MongoDB', 'REST APIs', 'Angular Material'],
                featured: true,
                category: 'Enterprise',
                order: 1,
                githubUrl: 'https://github.com/R-Sudheer-Kumar'
            },
            {
                id: '2',
                title: 'Custom UI Kit / UI Library',
                description: 'Reusable component library for rapid application development with theming support and accessibility.',
                longDescription: 'Developed a custom UI kit and component library to standardize UI development across projects. Features include theming engine, responsive components, form controls, data tables, and comprehensive documentation.',
                techStack: ['Angular', 'TypeScript', 'SCSS', 'Storybook', 'npm'],
                featured: true,
                category: 'Library',
                order: 2,
                githubUrl: 'https://github.com/R-Sudheer-Kumar'
            },
            {
                id: '3',
                title: 'Microfrontend Architecture Demo',
                description: 'Demonstration site showcasing microfrontend patterns and module federation.',
                longDescription: 'Created a demo site showcasing microfrontend architecture using Module Federation. Multiple independently deployed Angular applications communicate seamlessly through shared state management and routing.',
                techStack: ['Angular', 'Module Federation', 'Webpack', 'Microservices', 'Docker'],
                featured: true,
                category: 'Architecture',
                order: 3,
                githubUrl: 'https://github.com/R-Sudheer-Kumar'
            },
            {
                id: '4',
                title: 'AI-Powered Web Application',
                description: 'Currently developing an AI-integrated web application using modern web technologies and Cursor IDE.',
                longDescription: 'An ongoing project leveraging AI capabilities for intelligent web interactions. Built using modern web technologies with Cursor IDE for AI-assisted development.',
                techStack: ['Angular', 'Python', 'FastAPI', 'AI/ML', 'Firebase'],
                featured: false,
                category: 'AI',
                order: 4,
                githubUrl: 'https://github.com/R-Sudheer-Kumar'
            },
            {
                id: '5',
                title: 'Diabetes Prediction System',
                description: 'Deep learning model for diabetes prediction with a web interface for healthcare professionals.',
                longDescription: 'Academic project using deep learning algorithms to predict diabetes risk based on patient data. Features include data preprocessing, model training pipeline, and a user-friendly web interface for predictions.',
                techStack: ['Python', 'Deep Learning', 'TensorFlow', 'Flask', 'HTML/CSS'],
                featured: false,
                category: 'AI/ML',
                order: 5,
                githubUrl: 'https://github.com/R-Sudheer-Kumar'
            },
            {
                id: '6',
                title: 'Online Examination Portal',
                description: 'Full-stack examination portal with admin dashboard, question management, and automated grading.',
                longDescription: 'A Python full-stack web application for online examinations. Features include user authentication, exam creation by admins, timed tests, automated grading, and result analytics.',
                techStack: ['Python', 'Django', 'PostgreSQL', 'HTML', 'CSS', 'JavaScript'],
                featured: false,
                category: 'Web App',
                order: 6,
                githubUrl: 'https://github.com/R-Sudheer-Kumar'
            }
        ];
    }

    /** Default skills when API is unavailable */
    private getDefaultSkills(): Skill[] {
        return [
            { name: 'Angular', category: 'Frontend', proficiency: 90, icon: 'angular', order: 1 },
            { name: 'TypeScript', category: 'Frontend', proficiency: 88, icon: 'typescript', order: 2 },
            { name: 'JavaScript', category: 'Frontend', proficiency: 85, icon: 'javascript', order: 3 },
            { name: 'HTML5/CSS3', category: 'Frontend', proficiency: 92, icon: 'html5', order: 4 },
            { name: 'Angular Material', category: 'Frontend', proficiency: 88, icon: 'material', order: 5 },
            { name: 'TailwindCSS', category: 'Frontend', proficiency: 80, icon: 'tailwind', order: 6 },
            { name: 'RxJS', category: 'Frontend', proficiency: 82, icon: 'rxjs', order: 7 },
            { name: '.NET 8', category: 'Backend', proficiency: 82, icon: 'dotnet', order: 8 },
            { name: 'Python', category: 'Backend', proficiency: 80, icon: 'python', order: 9 },
            { name: 'FastAPI', category: 'Backend', proficiency: 75, icon: 'fastapi', order: 10 },
            { name: 'Django', category: 'Backend', proficiency: 70, icon: 'django', order: 11 },
            { name: 'REST APIs', category: 'Backend', proficiency: 88, icon: 'api', order: 12 },
            { name: 'SQL Server', category: 'Database', proficiency: 80, icon: 'sqlserver', order: 13 },
            { name: 'MongoDB', category: 'Database', proficiency: 78, icon: 'mongodb', order: 14 },
            { name: 'Firebase', category: 'Database', proficiency: 75, icon: 'firebase', order: 15 },
            { name: 'MySQL', category: 'Database', proficiency: 78, icon: 'mysql', order: 16 },
            { name: 'Microservices', category: 'Architecture', proficiency: 80, icon: 'microservices', order: 17 },
            { name: 'Microfrontends', category: 'Architecture', proficiency: 82, icon: 'microfrontend', order: 18 },
            { name: 'Git', category: 'Tools', proficiency: 85, icon: 'git', order: 19 },
            { name: 'Docker', category: 'Tools', proficiency: 70, icon: 'docker', order: 20 },
            { name: 'Responsive Design', category: 'Design', proficiency: 90, icon: 'responsive', order: 21 },
            { name: 'UI/UX Design', category: 'Design', proficiency: 80, icon: 'uiux', order: 22 },
            { name: 'Machine Learning', category: 'AI/ML', proficiency: 72, icon: 'ml', order: 23 },
            { name: 'Deep Learning', category: 'AI/ML', proficiency: 68, icon: 'dl', order: 24 }
        ];
    }

    /** Default experiences when API is unavailable */
    private getDefaultExperiences(): Experience[] {
        return [
            {
                id: '1',
                company: 'Snovasys Software Solutions Pvt. Ltd.',
                role: 'Software Developer',
                startDate: '2024-05-27',
                current: true,
                description: 'Working as a full-stack developer on enterprise applications, focusing on microfrontend architectures, custom UI library development, and modern Angular applications.',
                responsibilities: [
                    'Developed and maintained microfrontend architectures and microservices for enterprise clients',
                    'Created a comprehensive demo site showcasing company capabilities and products',
                    'Built a custom UI kit / UI library for standardized and rapid application development',
                    'Collaborated on FieldStaff group project using Angular, .NET 8, SQL Server, and MongoDB',
                    'Pioneered web development using Cursor IDE for AI-assisted coding workflows',
                    'Upgraded legacy Angular projects to the latest Angular versions with improved performance',
                    'Currently working on an AI-integrated web application project'
                ],
                techUsed: ['Angular', '.NET 8', 'SQL Server', 'MongoDB', 'TypeScript', 'Microservices', 'Microfrontends', 'REST APIs'],
                order: 1
            },
            {
                id: '2',
                company: 'IBM SkillsBuild',
                role: 'Front End Development Intern',
                startDate: '2023-06-05',
                endDate: '2023-07-10',
                current: false,
                description: 'Completed a front-end development internship program focusing on HTML, CSS, JavaScript, and modern web development practices.',
                responsibilities: [
                    'Built responsive web interfaces using HTML5, CSS3, and JavaScript',
                    'Learned and applied modern front-end development best practices',
                    'Completed certification in front-end development'
                ],
                techUsed: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
                order: 2
            }
        ];
    }
}
