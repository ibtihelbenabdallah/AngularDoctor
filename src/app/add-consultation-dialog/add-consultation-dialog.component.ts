import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    this.addConsultationForm = this.fb.group({
      PatientID: ['', Validators.required],
      DoctorID: ['', Validators.required],
      Date: ['', Validators.required],
      Reason: ['', Validators.required],
      Notes: ['']
    });
    this.loadPatients();
    this.loadDoctors();
  }

  loadPatients(): void {
    this.patientService.GetAll().subscribe((data) => {
      this.patients = data;
    });
  }

  loadDoctors(): void {
    this.doctorService.GetAll().subscribe((data) => {
      this.doctors = data;
    });
  }

  onSubmit(): void {
    if (this.addConsultationForm.valid) {
      this.consultationService.addConsultation(this.addConsultationForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      alert('Please fill out all required fields.');
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
