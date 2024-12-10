import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { PatientService } from '../services/patient.service';
import { ConsultationService } from '../services/consultation.service';
import { Consultation } from '../models/consultation';

@Component({
  selector: 'app-add-consultation-dialog',
  templateUrl: './add-consultation-dialog.component.html',
  styleUrls: ['./add-consultation-dialog.component.css']
})
export class AddConsultationDialogComponent implements OnInit {

 doctors: any[] = [];
  patients: any[] = [];
  consultation: Consultation = {
    PatientID: '',
    DoctorID: '',
    Date: '',
    Reason: '',
    Notes: ''
  };


  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private consultationService: ConsultationService
  ) {}

  ngOnInit(): void {
    this.fetchDoctors();
    this.fetchPatients();
  }

  fetchDoctors(): void {
    this.doctorService.GetAll().subscribe(data => {
      this.doctors = data;
    });
  }

  fetchPatients(): void {
    this.patientService.GetAll().subscribe(data => {
      this.patients = data;
    });
  }

  onSubmit(): void {
    this.consultationService.addConsultation(this.consultation).subscribe((response: any) => {
      console.log('Consultation added:', response);
      alert('Consultation successfully added!');
    });
  }




}
