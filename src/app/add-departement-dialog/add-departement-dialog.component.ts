import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departement } from '../models/departement';
import { DepartementService } from '../services/departement.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-departement-dialog',
  templateUrl: './add-departement-dialog.component.html',
  styleUrls: ['./add-departement-dialog.component.css']
})
export class AddDepartementDialogComponent {
  addDepartementForm: FormGroup;

  // Sample data for dropdown fields
 dataSource: any;

  constructor(
    private fb: FormBuilder,
    private departementService: DepartementService,
    public dialogRef: MatDialogRef<AddDepartementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  )  {
    this.addDepartementForm = this.fb.group({
      description: ['', Validators.required],
      specialisation: ['', Validators.required],
     
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addDepartement(): void {
    if (this.addDepartementForm.valid) {
      const departemetData = this.addDepartementForm.value;
  
      // Ajouter le médecin via le service
      this.departementService.AddDepartement(departemetData).subscribe(response => {
        console.log('departement added successfully!', response);
        this.dialogRef.close();
        
        // Rafraîchir la liste des médecins avec l'ID généré
        this.dialogRef.afterClosed().subscribe(() => {
          this.departementService.GetAll().subscribe((departements) => {
            // Mettre à jour la source des données avec la liste complète des médecins
            this.dataSource.push(response);  // Ajoute le nouveau médecin à la liste existante
            this.dataSource = [...this.dataSource];  // Force la détection des changements dans le tableau
          });
        });
      }, error => {
        console.error('Error adding departement ', error);
      });
    }
  }}
