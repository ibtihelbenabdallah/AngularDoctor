import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-add-doctor-dialog',
  templateUrl: './add-doctor-dialog.component.html',
  styleUrls: ['./add-doctor-dialog.component.css']
})
export class AddDoctorDialogComponent {
  addDoctorForm: FormGroup;

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
  )  {
    this.addDoctorForm = this.fb.group({
      Name: ['', Validators.required],
      Gender: ['', Validators.required],
      Mobile: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], // Updated pattern
      Email: ['', [Validators.required, Validators.email]],
      Specialization: ['', Validators.required],
      Education: ['', Validators.required],
      Experience: ['', Validators.required],
      DutyTiming: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addDoctor(): void {
    if (this.addDoctorForm.valid) {
      const doctorData = this.addDoctorForm.value;
  
      // Ajouter le médecin via le service
      this.doctorService.AddDoctor(doctorData).subscribe(response => {
        console.log('Doctor added successfully!', response);
        this.dialogRef.close();
        
        // Rafraîchir la liste des médecins avec l'ID généré
        this.dialogRef.afterClosed().subscribe(() => {
          this.doctorService.GetAll().subscribe((doctors) => {
            // Mettre à jour la source des données avec la liste complète des médecins
            this.dataSource.push(response);  // Ajoute le nouveau médecin à la liste existante
            this.dataSource = [...this.dataSource];  // Force la détection des changements dans le tableau
          });
        });
      }, error => {
        console.error('Error adding doctor', error);
      });
    }
  }}