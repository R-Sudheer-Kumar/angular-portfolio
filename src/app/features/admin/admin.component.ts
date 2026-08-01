import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../core/services/firebase.service';
import { Project, Skill, Experience, Profile } from '../../core/models/portfolio.models';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SkillsFormComponent } from './skills-form/skills-form.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SkillsFormComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  currentUser: any = null;
  activeTab: 'profile' | 'projects' | 'skills' | 'experience' = 'profile'; // Defaulting to profile to ensure login shows but tab content is logical

  // Login / Register Form
  loginForm: FormGroup;
  loginError = '';
  isLoginMode = true;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  // Profile Form
  profileForm: FormGroup;

  // Project Management
  projects: Project[] = [];
  editingProject: boolean = false;
  editingProjectId: string | null = null;
  projectForm: FormGroup;
  selectedFile: File | null = null;
  selectedResumeFile: File | null = null;

  // Skill Management
  skills: Skill[] = [];
  editingSkill: boolean = false;

  // Experience Management
  experiences: Experience[] = [];
  editingExperience: boolean = false;
  editingExperienceId: string | null = null;
  experienceForm!: FormGroup;

  // Seeding
  seeding = false;

  // UI State
  isSidebarCollapsed = false;
  showUserMenu = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  getTabClass(tabName: string): string {
    const baseClass = 'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden';
    const activeClass = 'bg-primary/10 text-primary font-medium';
    const inactiveClass = 'text-slate-400 hover:bg-slate-800 hover:text-slate-200';

    return this.activeTab === tabName
      ? `${baseClass} ${activeClass}`
      : `${baseClass} ${inactiveClass}`;
  }

  constructor(
    private firebaseService: FirebaseService,
    private fb: FormBuilder
  ) {
    // Login Form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Profile Form
    this.profileForm = this.fb.group({
      name: [''],
      title: [''],
      tagline: [''],
      bio: [''],
      location: [''],
      email: [''],
      phone: [''],
      resumeUrl: [''],
      yearsOfExperience: [''],
      projectsCount: [''],
      workingStatus: [''],
      statusSymbol: [''],
      passion: [''],
      topSkills: ['']
    });

    // Project Form
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      techStack: [''],
      githubUrl: [''],
      liveUrl: [''],
      featured: [false],
      category: ['Web App'],
      order: [0]
    });

    // Experience Form
    this.experienceForm = this.fb.group({
      company: ['', Validators.required],
      role: ['', Validators.required],
      location: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      current: [false],
      description: [''],
      responsibilities: [''],
      techUsed: [''],
      order: [0]
    });

    this.firebaseService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadData();
      }
    });
  }

  get userEmail(): string {
    return this.currentUser?.email || '';
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;

    try {
      if (this.isLoginMode) {
        await this.firebaseService.login(email, password);
      } else {
        await this.firebaseService.register(email, password);
      }
      this.loginError = '';
    } catch (err: any) {
      this.loginError = err.message;
    }
  }

  logout() {
    this.firebaseService.logout();
  }

  loadData() {
    this.loadProfile();
    this.loadProjects();
    this.loadSkills();
    this.loadExperiences();
  }

  // ─── Profile ──────────────────────────────────────────
  loadProfile() {
    this.firebaseService.getProfile().subscribe(p => {
      if (p) {
        this.profileForm.patchValue(p);
      }
    });
  }

  onResumeFileSelected(event: any) {
    this.selectedResumeFile = event.target.files[0];
    this.profileForm.markAsDirty();
  }

  async saveProfile() {
    if (this.profileForm.dirty || this.selectedResumeFile) {
      try {
        const profileData = { ...this.profileForm.value };
        if (this.selectedResumeFile) {
          const url = await this.firebaseService.uploadResume(this.selectedResumeFile);
          profileData.resumeUrl = url;
        }
        await this.firebaseService.updateProfile(profileData);
        this.selectedResumeFile = null;
        this.profileForm.patchValue(profileData);
        alert('Profile updated!');
      } catch (error) {
        console.error('Error saving profile:', error);
        alert('Failed to save profile');
      }
    }
  }

  // ─── Projects ─────────────────────────────────────────
  loadProjects() {
    this.firebaseService.getProjects().subscribe(ps => this.projects = ps);
  }

  addNewProject() {
    this.editingProject = true;
    this.editingProjectId = null;
    this.projectForm.reset({ featured: false, order: 0 });
    this.selectedFile = null;
  }

  editProject(project: Project) {
    this.editingProject = true;
    this.editingProjectId = project.id || null;
    this.projectForm.patchValue({
      ...project,
      techStack: project.techStack.join(', ')
    });
  }

  cancelEdit() {
    this.editingProject = false;
    this.editingProjectId = null;
    this.selectedFile = null;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async onSaveProject() {
    if (this.projectForm.invalid) return;

    const formVal = this.projectForm.value;
    // Convert comma-separated tech stack to array -- ensure it's a string
    const techStackArray = typeof formVal.techStack === 'string'
      ? formVal.techStack.split(',').map((t: string) => t.trim())
      : formVal.techStack;

    const projectData: any = {
      ...formVal,
      techStack: techStackArray
    };

    try {
      // Upload image if selected
      if (this.selectedFile) {
        const url = await this.firebaseService.uploadProjectImage(this.selectedFile);
        projectData.imageUrl = url;
      }

      if (this.editingProjectId) {
        await this.firebaseService.updateProject(this.editingProjectId, projectData);
      } else {
        await this.firebaseService.addProject(projectData);
      }

      this.editingProject = false;
      this.selectedFile = null;
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project');
    }
  }

  async deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      await this.firebaseService.deleteProject(id);
    }
  }

  // ─── Skills ───────────────────────────────────────────
  loadSkills() {
    this.firebaseService.getSkills().subscribe(s => this.skills = s);
  }

  async deleteSkill(id: string) {
    if (confirm('Delete skill?')) {
      await this.firebaseService.deleteSkill(id);
    }
  }

  // ─── Experience ───────────────────────────────────────
  loadExperiences() {
    this.firebaseService.getExperience().subscribe(e => this.experiences = e);
  }

  addNewExperience() {
    this.editingExperience = true;
    this.editingExperienceId = null;
    this.experienceForm.reset({ current: false, order: 0 });
  }

  editExperience(exp: Experience) {
    this.editingExperience = true;
    this.editingExperienceId = exp.id || null;
    this.experienceForm.patchValue({
      ...exp,
      responsibilities: exp.responsibilities ? exp.responsibilities.join('\n') : '',
      techUsed: exp.techUsed ? exp.techUsed.join(', ') : ''
    });
  }

  cancelEditExperience() {
    this.editingExperience = false;
    this.editingExperienceId = null;
  }

  async onSaveExperience() {
    if (this.experienceForm.invalid) return;

    const formVal = this.experienceForm.value;
    
    const respArray = typeof formVal.responsibilities === 'string'
      ? formVal.responsibilities.split('\n').map((r: string) => r.trim()).filter((r: string) => r.length > 0)
      : formVal.responsibilities || [];

    const techUsedArray = typeof formVal.techUsed === 'string'
      ? formVal.techUsed.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0)
      : formVal.techUsed || [];

    const expData: any = {
      ...formVal,
      responsibilities: respArray,
      techUsed: techUsedArray
    };

    try {
      if (this.editingExperienceId) {
        await this.firebaseService.updateExperience(this.editingExperienceId, expData);
      } else {
        await this.firebaseService.addExperience(expData);
      }
      this.editingExperience = false;
      this.loadExperiences();
    } catch (error) {
      console.error('Error saving experience:', error);
      alert('Failed to save experience');
    }
  }

  async deleteExperience(id: string) {
    if (confirm('Are you sure you want to delete this experience?')) {
      try {
        await this.firebaseService.deleteExperience(id);
        this.loadExperiences();
      } catch (error) {
        console.error('Error deleting experience:', error);
        alert('Failed to delete experience');
      }
    }
  }

  // ─── Seeding ──────────────────────────────────────────
  async seedDatabase() {
    if (!confirm('This will populate the database with default data. Continue?')) return;

    this.seeding = true;
    try {
      // 1. Profile
      const defaultProfile: Profile = {
        name: 'R. Sudheer Kumar',
        title: 'Full Stack Developer',
        tagline: 'Building Modern Web Experiences with Angular, .NET & Cloud Technologies',
        bio: 'Enthusiastic, self-motivated, and reliable full-stack developer with expertise in microfrontends, microservices, and modern web technologies. Currently working at Snovasys Software Solutions, contributing to enterprise-grade applications using Angular, .NET 8, SQL Server, and MongoDB.',
        email: 'rsudheerkumar40@gmail.com',
        phone: '+91 7780664087',
        location: 'Andhra Pradesh, India',
        resumeUrl: '',
        socialLinks: [
          { platform: 'GitHub', url: 'https://github.com/R-Sudheer-Kumar', icon: 'github' },
          { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/rachamadugu-sudheer-kumar', icon: 'linkedin' }
        ],
        yearsOfExperience: '1.5+ Years',
        projectsCount: '6+ Shipped',
        workingStatus: 'Currently Working',
        statusSymbol: 'READY_TO_BUILD',
        passion: 'Creating Impact',
        topSkills: 'Angular, .NET 8, MongoDB'
      };
      await this.firebaseService.updateProfile(defaultProfile);

      // 2. Projects
      // Check if projects exist to avoid dupes? No, seed implies reset/add.
      const defaultProjects: any[] = [
        {
          title: 'FieldStaff Management System',
          description: 'Enterprise field staff management application with real-time tracking, task assignment, and reporting capabilities.',
          techStack: ['Angular', '.NET 8', 'SQL Server', 'MongoDB', 'REST APIs', 'Angular Material'],
          featured: true,
          category: 'Enterprise',
          order: 1,
          githubUrl: 'https://github.com/R-Sudheer-Kumar'
        },
        {
          title: 'Custom UI Kit / UI Library',
          description: 'Reusable component library for rapid application development with theming support and accessibility.',
          techStack: ['Angular', 'TypeScript', 'SCSS', 'Storybook', 'npm'],
          featured: true,
          category: 'Library',
          order: 2,
          githubUrl: 'https://github.com/R-Sudheer-Kumar'
        },
        {
          title: 'Microfrontend Architecture Demo',
          description: 'Demonstration site showcasing microfrontend patterns and module federation.',
          techStack: ['Angular', 'Module Federation', 'Webpack', 'Microservices', 'Docker'],
          featured: true,
          category: 'Architecture',
          order: 3,
          githubUrl: 'https://github.com/R-Sudheer-Kumar'
        },
        {
          title: 'AI-Powered Web Application',
          description: 'Currently developing an AI-integrated web application using modern web technologies and Cursor IDE.',
          techStack: ['Angular', 'Python', 'FastAPI', 'AI/ML', 'Firebase'],
          featured: false,
          category: 'AI',
          order: 4,
          githubUrl: 'https://github.com/R-Sudheer-Kumar'
        },
        {
          title: 'Diabetes Prediction System',
          description: 'Deep learning model for diabetes prediction with a web interface for healthcare professionals.',
          techStack: ['Python', 'Deep Learning', 'TensorFlow', 'Flask', 'HTML/CSS'],
          featured: false,
          category: 'AI/ML',
          order: 5,
          githubUrl: 'https://github.com/R-Sudheer-Kumar'
        }
      ];

      for (const p of defaultProjects) {
        await this.firebaseService.addProject(p);
      }

      // 3. Skills
      const defaultSkills: any[] = [
        { name: 'Angular', category: 'Frontend', proficiency: 90, icon: '', order: 1 },
        { name: 'TypeScript', category: 'Frontend', proficiency: 88, icon: '', order: 2 },
        { name: 'JavaScript', category: 'Frontend', proficiency: 85, icon: '', order: 3 },
        { name: 'HTML5/CSS3', category: 'Frontend', proficiency: 92, icon: '', order: 4 },
        { name: 'Angular Material', category: 'Frontend', proficiency: 88, icon: '', order: 5 },
        { name: '.NET 8', category: 'Backend', proficiency: 82, icon: '', order: 8 },
        { name: 'Python', category: 'Backend', proficiency: 80, icon: '', order: 9 },
        { name: 'SQL Server', category: 'Database', proficiency: 80, icon: '', order: 13 },
        { name: 'MongoDB', category: 'Database', proficiency: 78, icon: '', order: 14 },
        { name: 'Microservices', category: 'Architecture', proficiency: 80, icon: '', order: 17 },
        { name: 'Git', category: 'Tools', proficiency: 85, icon: '', order: 19 }
      ];

      for (const s of defaultSkills) {
        await this.firebaseService.addSkill(s);
      }

      // 4. Experience
      const defaultExperience: any[] = [
        {
          company: 'Snovasys Software Solutions Pvt. Ltd.',
          role: 'Software Developer',
          startDate: '2024-05-27',
          current: true,
          description: 'Working as a full-stack developer on enterprise applications, focusing on microfrontend architectures, custom UI library development, and modern Angular applications.',
          responsibilities: [
            'Developed and maintained microfrontend architectures and microservices',
            'Created a comprehensive demo site showcasing company capabilities',
            'Built a custom UI kit / UI library',
            'Collaborated on FieldStaff group project'
          ],
          techUsed: ['Angular', '.NET 8', 'SQL Server', 'MongoDB', 'TypeScript'],
          order: 1
        },
        {
          company: 'IBM SkillsBuild',
          role: 'Front End Development Intern',
          startDate: '2023-06-05',
          endDate: '2023-07-10',
          current: false,
          description: 'Completed a front-end development internship program.',
          responsibilities: [
            'Built responsive web interfaces',
            'Learned modern front-end best practices'
          ],
          techUsed: ['HTML', 'CSS', 'JavaScript'],
          order: 2
        }
      ];

      for (const e of defaultExperience) {
        await this.firebaseService.addExperience(e);
      }

      alert('Database seeded successfully!');
      this.loadData();
    } catch (error) {
      console.error(error);
      alert('Seeding failed. See console.');
    } finally {
      this.seeding = false;
    }
  }
}
