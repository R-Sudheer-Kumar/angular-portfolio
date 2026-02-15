import { Component, Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, doc, updateDoc, addDoc, deleteDoc, setDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Experience, Profile, Project, Skill } from '../models/portfolio.models';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    private app;
    private analytics;
    private db;
    private auth;
    private storage;

    // Observables initialized in constructor
    private userSubject = new BehaviorSubject<User | null>(null);
    currentUser$ = this.userSubject.asObservable();

    constructor() {
        // Initialize Firebase with process.env (injected by @ngx-env/builder)
        // Note: Angular doesn't have process.env by default. This relies on @ngx-env/builder
        const config = {
            apiKey: process.env['NG_APP_FIREBASE_API_KEY'],
            authDomain: process.env['NG_APP_FIREBASE_AUTH_DOMAIN'],
            projectId: process.env['NG_APP_FIREBASE_PROJECT_ID'],
            storageBucket: process.env['NG_APP_FIREBASE_STORAGE_BUCKET'],
            messagingSenderId: process.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID'],
            appId: process.env['NG_APP_FIREBASE_APP_ID'],
            measurementId: process.env['NG_APP_FIREBASE_MEASUREMENT_ID']
        };

        if (!config.apiKey) {
            console.error('Firebase config missing! Check your .env file or environment variables.');
        }

        this.app = initializeApp(config);
        this.analytics = getAnalytics(this.app);
        this.db = getFirestore(this.app);
        this.auth = getAuth(this.app);
        this.storage = getStorage(this.app);

        this.auth.onAuthStateChanged(user => this.userSubject.next(user));
    }

    // Auth
    login(email: string, pass: string) {
        return signInWithEmailAndPassword(this.auth, email, pass);
    }

    register(email: string, pass: string) {
        return createUserWithEmailAndPassword(this.auth, email, pass);
    }

    logout() {
        return signOut(this.auth);
    }

    // Profile
    getProfile(): Observable<Profile | null> {
        return from(getDocs(collection(this.db, 'portfolio'))).pipe(
            map(snapshot => {
                const doc = snapshot.docs.find(d => d.id === 'profile');
                return doc ? (doc.data() as Profile) : null;
            }),
            catchError(() => of(null))
        );
    }

    async updateProfile(data: Partial<Profile>) {
        const profileRef = doc(this.db, 'portfolio', 'profile');
        // Use setDoc with merge: true to create if not exists
        return setDoc(profileRef, data, { merge: true });
    }

    // Projects
    getProjects(): Observable<Project[]> {
        return from(getDocs(collection(this.db, 'projects'))).pipe(
            map(snapshot => snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Project)))
        );
    }

    async addProject(project: Project) {
        // Remove undefined fields
        const cleanProject = JSON.parse(JSON.stringify(project));
        return addDoc(collection(this.db, 'projects'), cleanProject);
    }

    async updateProject(id: string, project: Partial<Project>) {
        const cleanProject = JSON.parse(JSON.stringify(project));
        return updateDoc(doc(this.db, 'projects', id), cleanProject);
    }

    async deleteProject(id: string) {
        return deleteDoc(doc(this.db, 'projects', id));
    }

    // Skills
    getSkills(): Observable<Skill[]> {
        return from(getDocs(collection(this.db, 'skills'))).pipe(
            map(snapshot => snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Skill)))
        );
    }

    async addSkill(skill: Skill) {
        const cleanSkill = JSON.parse(JSON.stringify(skill));
        return addDoc(collection(this.db, 'skills'), cleanSkill);
    }

    async updateSkill(id: string, skill: Partial<Skill>) {
        const cleanSkill = JSON.parse(JSON.stringify(skill));
        return updateDoc(doc(this.db, 'skills', id), cleanSkill);
    }

    async deleteSkill(id: string) {
        return deleteDoc(doc(this.db, 'skills', id));
    }

    // Experience
    getExperience(): Observable<Experience[]> {
        return from(getDocs(collection(this.db, 'experience'))).pipe(
            map(snapshot => snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Experience)))
        );
    }

    async addExperience(exp: Experience) {
        const cleanExp = JSON.parse(JSON.stringify(exp));
        return addDoc(collection(this.db, 'experience'), cleanExp);
    }

    async updateExperience(id: string, exp: Partial<Experience>) {
        const cleanExp = JSON.parse(JSON.stringify(exp));
        return updateDoc(doc(this.db, 'experience', id), cleanExp);
    }

    // Helper: Upload Image
    async uploadProjectImage(file: File): Promise<string> {
        const path = `projects/${Date.now()}_${file.name}`;
        const storageRef = ref(this.storage, path);
        const result = await uploadBytes(storageRef, file);
        return getDownloadURL(result.ref);
    }
}
