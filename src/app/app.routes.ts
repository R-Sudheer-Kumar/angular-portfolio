import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
        data: { title: 'Sudheer Kumar - Full Stack Developer' }
    },
    {
        path: 'projects',
        loadComponent: () => import('./features/projects/projects.component').then(m => m.ProjectsComponent),
        data: { title: 'Projects - Sudheer Kumar' }
    },
    {
        path: 'skills',
        loadComponent: () => import('./features/skills/skills.component').then(m => m.SkillsComponent),
        data: { title: 'Skills - Sudheer Kumar' }
    },
    {
        path: 'experience',
        loadComponent: () => import('./features/experience/experience.component').then(m => m.ExperienceComponent),
        data: { title: 'Experience - Sudheer Kumar' }
    },
    {
        path: 'contact',
        loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
        data: { title: 'Contact - Sudheer Kumar' }
    },
    {
        path: 'admin',
        loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent),
        title: 'Admin Dashboard'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
