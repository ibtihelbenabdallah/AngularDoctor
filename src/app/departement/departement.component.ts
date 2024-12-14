import { Departement } from '../models/departement';
import { DepartementService } from '../services/departement.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AddDepartementDialogComponent } from '../add-departement-dialog/add-departement-dialog.component';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent {
  
  dataSource: Departement[] = [];

 

  constructor(
    private Ms: DepartementService,
    public dialog: MatDialog,
  ) {}

  displayedColumns: string[] = ['Id', 'Description', 'Specialisation','Action'];

  ngOnInit(): void {
    this.Ms.GetAll().subscribe({
      next: (result) => {
        console.log('Departements fetched:', result);
        this.dataSource = result;
      },
      error: (err) => {
        console.error('Error fetching departements:', err);
      }
    });
  }

  // Ouvrir le dialog pour ajouter un médecin
  openAddDepartementDialog(): void {
    const dialogRef = this.dialog.open(AddDepartementDialogComponent, {
      width: '600px', // Set the width
      height: '700px', 
    });

   

   dialogRef.afterClosed().subscribe((result: Departement | undefined) => {
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
      this.Ms.deleteDepartement(id).subscribe({
        next: () => {
          console.log('Departement deleted successfully!');
          
          // Optionally, fetch the list again from the server
          this.Ms.GetAll().subscribe((departements) => {
            this.dataSource = departements;  // Update the local list with the fresh data from the server
          });
        },
        error: (err) => {
          console.error('Error deleting departement:', err);
          alert('Erreur lors de la suppression du médecin.');
        }
      });
    }
  }
  
}


