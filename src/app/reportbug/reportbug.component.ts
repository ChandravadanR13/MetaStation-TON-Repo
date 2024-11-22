import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reportbug',
  templateUrl: './reportbug.component.html',
  styleUrls: ['./reportbug.component.scss']
})


export class ReportbugComponent {
  bugReportForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bugReportForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      bugTitle: ['', Validators.required],
      description: ['', Validators.required],
      steps: [''],
      priority: ['Low'],
      deviceDetails: [''],
    });
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
    }
  }

  onSubmit(): void {
    if (this.bugReportForm.valid) {
      console.log('Form submitted:', this.bugReportForm.value);
      alert('Thank you for reporting the bug!');
    }
  }
}
