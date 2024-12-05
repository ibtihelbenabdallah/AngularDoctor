import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-add-patient-dialog',
  templateUrl: './add-patient-dialog.component.html',
  styleUrls: ['./add-patient-dialog.component.css']
})
export class AddPatientDialogComponent {

  addPatientForm: FormGroup;

  // Sample data for dropdown fields
  Genre = ['Male', 'Female'];
  dataSource: any;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    public dialogRef: MatDialogRef<AddPatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  )  {
    this.addPatientForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Mobile: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], // Updated pattern
      Disease: ['', Validators.required],
      Gender: ['', Validators.required],
      BloodGroup: ['', Validators.required],
      DutyTiming: ['', Validators.required],
      DOB: ['', Validators.required],
      Address: ['', Validators.required],
      Symptoms: ['', Validators.required]

      
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addPatient(): void {
    if (this.addPatientForm.valid) {
      const patientData = this.addPatientForm.value;
  
      // Ajouter le médecin via le service
      this.patientService.AddPatient(patientData).subscribe(response => {
        console.log('Patient added successfully!', response);
        this.dialogRef.close();
        
        // Rafraîchir la liste des médecins avec l'ID généré
        this.dialogRef.afterClosed().subscribe(() => {
          this.patientService.GetAll().subscribe((patients) => {
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
