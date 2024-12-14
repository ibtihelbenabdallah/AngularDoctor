import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DoctorService } from '../services/doctor.service';
import { Departement } from '../models/departement';

@Component({
  selector: 'app-add-doctor-dialog',
  templateUrl: './add-doctor-dialog.component.html',
  styleUrls: ['./add-doctor-dialog.component.css']
})
export class AddDoctorDialogComponent implements OnInit {
  addDoctorForm: FormGroup;
  departments: Departement[] = []; // Stocker la liste des départements

  // Sample data for dropdown fields
  specializationData = ['General Medicine', 'Cardiology', 'Neurology'];
  experienceData = ['1+ years', '3+ years', '5+ years'];
  dutyTimingsData = ['08:00 AM - 05:00 PM', '10:00 AM - 07:00 PM'];
  dataSource: any;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    public dialogRef: MatDialogRef<AddDoctorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize form group here
    this.addDoctorForm = this.fb.group({
      Name: ['', Validators.required],
      Gender: ['', Validators.required],
      Mobile: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], // Updated pattern
      Email: ['', [Validators.required, Validators.email]],
      Specialization: ['', Validators.required],
      Education: ['', Validators.required],
      Experience: ['', Validators.required],
      DutyTiming: ['', Validators.required],
      departementId: ['', Validators.required], // Correct placement of this line with a comma
    });
  }

  ngOnInit(): void {
    // Charger les départements depuis le service
    this.doctorService.GetAll().subscribe(([doctors, departments]) => {
      this.departments = departments;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addDoctor(): void {
    if (this.addDoctorForm.valid) {
      const doctorData = this.addDoctorForm.value;

      // Assurez-vous d'envoyer l'ID du département
      if (!doctorData.idDoctor) {
        doctorData.idDoctor = this.generateDoctorId();
      }

      // Ajoutez le médecin via le service
      this.doctorService.AddDoctor(doctorData).subscribe(response => {
        console.log('Doctor added successfully!', response);
        this.dialogRef.close();

        // Rafraîchir la liste des médecins après la fermeture du dialog
        this.dialogRef.afterClosed().subscribe(() => {
          this.doctorService.GetAll().subscribe(([doctors, departments]) => {
            this.dataSource.push(response);
            this.dataSource = [...this.dataSource]; // Force change detection
          });
        });
      }, error => {
        console.error('Error adding doctor', error);
      });
    }
  }

  // Optional: A method to generate a doctor ID (if you want to generate it programmatically)
  generateDoctorId(): string {
    return 'id' + Math.random().toString(36).substr(2, 9); // Example for generating a random id
  }
}
