/** Project model representing a portfolio project */
export interface Project {
    id?: string;
    title: string;
    description: string;
    longDescription?: string;
    techStack: string[];
    imageUrl?: string;
    liveUrl?: string;
    githubUrl?: string;
    featured: boolean;
    category: string;
    order: number;
    createdAt?: string;
    updatedAt?: string;
}

/** Skill model representing a technical skill */
export interface Skill {
    id?: string;
    name: string;
    category: string;
    proficiency: number; // 0-100
    icon?: string;
    order: number;
}

/** Experience model representing work experience */
export interface Experience {
    id?: string;
    company: string;
    location?: string; // Added location field
    role: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
    responsibilities: string[];
    techUsed: string[];
    order: number;
}

/** Contact form message model */
export interface ContactMessage {
    id?: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    read: boolean;
    createdAt?: string;
}

/** Profile data model */
export interface Profile {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    photoUrl?: string;
    resumeUrl?: string;
    socialLinks: SocialLink[];
    yearsOfExperience?: string;
    projectsCount?: string;
    workingStatus?: string;
    statusSymbol?: string;
    passion?: string;
    topSkills?: string;
}

/** Social link model */
export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
}

/** API response wrapper */
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

/** Admin credentials */
export interface AdminCredentials {
    username: string;
    password: string;
}

/** Auth token response */
export interface AuthToken {
    access_token: string;
    token_type: string;
}
