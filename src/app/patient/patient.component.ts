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
      width: '600px', // Set the width
      height: '700px',

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
    if (confirm('Êtes-vous sûr de vouloir supprimer ce médecin ?')) {
      // Call the delete method from the service
      this.Ms.deletePatient(id).subscribe({
        next: () => {
          console.log('Patient deleted successfully!');
          
          // Optionally, fetch the list again from the server
          this.Ms.GetAll().subscribe((patients) => {
            this.dataSource = patients;  // Update the local list with the fresh data from the server
          });
        },
        error: (err) => {
          console.error('Error deleting patient:', err);
          alert('Erreur lors de la suppression du patient.');
        }
      });
    }
  }


  

  //delete(idPatient: string): void {
   // if (confirm('Êtes-vous sûr de vouloir supprimer ce patient ?')) {
     // this.Ms.deletePatient(idPatient).subscribe(() => {
        // Supprimer localement le médecin de la liste
       // this.dataSource = this.dataSource.filter(patient => patient.idPatient !== idPatient);
     // });
   // }
// }



}
