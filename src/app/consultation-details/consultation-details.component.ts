import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultationService } from '../services/consultation.service';
import { DoctorService } from '../services/doctor.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-consultation-details',
  templateUrl: './consultation-details.component.html',
  styleUrls: ['./consultation-details.component.css']
})
export class ConsultationDetailsComponent implements OnInit {
  consultation: any = null;
  isPopupOpen = false;
  form!: FormGroup;
  consultationId: string | null = null;
  patients: any[] = [];
  doctors: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private consultationService: ConsultationService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.consultationId = this.route.snapshot.paramMap.get('id');
    if (this.consultationId) {
      this.fetchConsultationDetails(this.consultationId);
    } else {
      console.error('Consultation ID is undefined');
    }

    // Load patients and doctors
    this.loadPatients();
    this.loadDoctors();
  }

  fetchConsultationDetails(id: string): void {
    this.consultationService.getConsultationById(id).subscribe(
      (data) => {
        if (data) {
          this.consultation = data;
          this.initializeForm();
        }
      },
      (error) => {
        console.error('Error fetching consultation details:', error);
      }
    );
  }

  initializeForm(): void {
    this.form = this.fb.group({
      PatientName: [this.consultation?.PatientName || '', Validators.required],
      DoctorName: [this.consultation?.DoctorName || '', Validators.required],
      Date: [this.consultation?.Date || '', Validators.required],
      ConsultationTime: [this.consultation?.ConsultationTime || '', Validators.required], // Add time field
      Notes: [this.consultation?.Notes || ''],
      Reason: [this.consultation?.Reason || '']
    });
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

  openEditPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedConsultation = this.form.value;

      this.consultationService.updateConsultation(this.consultation.id, updatedConsultation).subscribe(
        (response) => {
          // Update the local consultation object
          this.consultation = { ...this.consultation, ...updatedConsultation };

          // Close the popup and notify the user
          this.isPopupOpen = false;
          alert('Consultation updated successfully!');
        },
        (error) => {
          console.error('Error updating consultation:', error);
        }
      );
    }
  }
}
