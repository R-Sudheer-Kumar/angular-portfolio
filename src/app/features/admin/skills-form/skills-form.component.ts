import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from '../../../core/services/firebase.service';
import { Skill } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-skills-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="skill-form">
      <h3>{{ skill ? 'Edit Skill' : 'Add Skill' }}</h3>
      <form [formGroup]="skillForm" (ngSubmit)="onSubmit()">
        <input formControlName="name" placeholder="Skill Name" class="form-input">
        <select formControlName="category" class="form-input">
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Database">Database</option>
          <option value="Cloud">Cloud</option>
          <option value="Tools">Tools</option>
          <option value="DevOps">DevOps</option>
          <option value="Architecture">Architecture</option>
          <option value="AI/ML">AI/ML</option>
        </select>
        <input type="number" formControlName="proficiency" min="0" max="100" placeholder="Proficiency (0-100)" class="form-input">
        
        <div class="actions">
          <button type="submit" class="btn-primary">Save Skill</button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./skills-form.component.scss']
})
export class SkillsFormComponent {
  skillForm: FormGroup;
  skill: Skill | null = null;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      category: ['Frontend', Validators.required],
      proficiency: [50, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  async onSubmit() {
    if (this.skillForm.invalid) return;
    const data = this.skillForm.value;
    try {
      if (this.skill && this.skill.id) {
        await this.firebaseService.updateSkill(this.skill.id, data);
        console.log('Skill updated successfully');
      } else {
        await this.firebaseService.addSkill(data);
        console.log('Skill added successfully');
      }
      this.skillForm.reset({ category: 'Frontend', proficiency: 50 });
      this.skill = null;
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  }
}
