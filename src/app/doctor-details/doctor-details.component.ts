import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor.service';
import { DepartementService } from '../services/departement.service';
import { Doctor } from '../models/doctor';
import { Departement } from '../models/departement';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {
  doctor: Doctor | undefined;
  departements: Departement[] = [];
  idcourant!: string;
  form!: FormGroup;
  isPopupOpen = false;
  dutyTimingsData = ['08:00 AM - 05:00 PM', '10:00 AM - 07:00 PM', '12:00 PM - 09:00 PM', '04:00 PM - 12:00 AM'];

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private departementService: DepartementService
  ) {}

  ngOnInit(): void {
    this.idcourant = this.route.snapshot.params['id'];
    console.log(this.idcourant);
    
    // Load departments
    this.departementService.GetAll().subscribe((departements) => {
      this.departements = departements;
    });

    // Load doctor information
    if (this.idcourant) {
      this.doctorService.getDoctorById(this.idcourant).subscribe((doctor) => {
        this.doctor = doctor;

        if (this.doctor?.departementId) {
          this.departementService.getDepartementById(this.doctor.departementId).subscribe((departement) => {
            if (this.doctor) {
              this.doctor.Department = departement;
            }
          });
        }

        // Create the form
        this.form = new FormGroup({
          id: new FormControl(doctor.id, [Validators.required]),
          Name: new FormControl(doctor.Name, [Validators.required]),
          Gender: new FormControl(doctor.Gender, [Validators.required]),
          Email: new FormControl(doctor.Email, [Validators.required, Validators.email]),
          Mobile: new FormControl(doctor.Mobile, [Validators.required, Validators.pattern('^[0-9]{8}$')]),
          departementId: new FormControl(doctor.departementId, [Validators.required]),
          DutyTiming: new FormControl(doctor.DutyTiming, [Validators.required]),
        });
      });
    }
  }

  openEditPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedDoctor = this.form.value;
      console.log('Updated data:', updatedDoctor);
      this.doctorService.updateDoctor(updatedDoctor, this.idcourant).subscribe(
        (updatedDoctorResponse) => {
          console.log('Doctor updated successfully');
          if (this.doctor) {
            this.doctor = { ...this.doctor, ...updatedDoctorResponse };
          }
          this.closePopup();
        },
        (error) => {
          console.error('Error updating doctor:', error);
        }
      );
    }
  }
}
