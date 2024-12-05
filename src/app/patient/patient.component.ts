import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPatientDialogComponent } from '../add-patient-dialog/add-patient-dialog.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent  implements OnInit {
  dataSource: Patient[] = [];

  
  constructor(
    private Ms: PatientService,
    public dialog: MatDialog,
  ) {}

  displayedColumns: string[] = ['Id', 'Name', 'Email','Mobile',  'Disease','Gender','BloodGroup', 'Action'];

  ngOnInit(): void {
    this.Ms.GetAll().subscribe((result) => {
      console.log(result); // Affichez les données dans la console

      this.dataSource = result;

      
    });
  }

  // Ouvrir le dialog pour ajouter un médecin
  openAddPatientDialog(): void {
    const dialogRef = this.dialog.open(AddPatientDialogComponent, {
      width: '400px'
    });

   
   // dialogRef.afterClosed().subscribe(result => {
      // Rafraîchir la liste des médecins si nécessaire
     // this.Ms.GetAll().subscribe((result) => {
     //   this.dataSource = result;
    //  });
   // });

   dialogRef.afterClosed().subscribe((result: Patient | undefined) => {
    if (result) {
      // Add the new doctor to the table
      this.dataSource = [...this.dataSource, result];
    } else {
      // Optionally, refresh the list from the backend
      this.Ms.GetAll().subscribe((result) => {
        this.dataSource = result;
      });
    }
  });
  }

  

  delete(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce patient ?')) {
      this.Ms.deletePatient(id).subscribe(() => {
        // Supprimer localement le médecin de la liste
        this.dataSource = this.dataSource.filter(patient => patient.id !== id);
      });
    }
 }



}
