import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConsultationService } from '../services/consultation.service';
import { DoctorService } from '../services/doctor.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-add-consultation-dialog',
  templateUrl: './add-consultation-dialog.component.html',
  styleUrls: ['./add-consultation-dialog.component.css']
})
export class AddConsultationDialogComponent {
  consultation: any = {};
  patients: any[] = [];
  doctors: any[] = [];
  addConsultationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddConsultationDialogComponent>,
    private consultationService: ConsultationService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private fb: FormBuilder
  ) {
    // Initialize form
    this.addConsultationForm = this.fb.group({
      PatientName: ['', Validators.required],
      DoctorName: ['', Validators.required],
      Date: ['', Validators.required],
      Reason: ['', Validators.required],
      Notes: ['']
    });
    

    this.loadPatients();
    this.loadDoctors();
  }

  loadPatients(): void {
    this.patientService.GetAll().subscribe(
      (data) => (this.patients = data),
      (error) => {
        console.error('Failed to load patients', error);
        this.patients = [];
      }
    );
  }

  loadDoctors(): void {
    this.doctorService.GetAll().subscribe(
      (data) => (this.doctors = data),
      (error) => {
        console.error('Failed to load doctors', error);
        this.doctors = [];
      }
    );
  }

  onSubmit(): void {
    if (this.addConsultationForm.valid) {
      const consultation = {
        ...this.addConsultationForm.value,
        // If needed, you can map additional properties here
      };
  
      this.consultationService.addConsultation(consultation).subscribe(
        () => {
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error adding consultation:', error);
          alert('Failed to add consultation. Please try again.');
        }
      );
    } else {
      alert('Please fill out all required fields.');
    }
  }
  

  closeDialog(): void {
    this.dialogRef.close();
  }
}
