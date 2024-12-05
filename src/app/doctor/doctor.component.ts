import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DoctorService } from '../services/doctor.service';
import { Doctor } from '../models/doctor';
import { AddDoctorDialogComponent } from '../add-doctor-dialog/add-doctor-dialog.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  dataSource: Doctor[] = [];

 

  constructor(
    private Ms: DoctorService,
    public dialog: MatDialog,
  ) {}

  displayedColumns: string[] = ['Id', 'Name', 'Specialization', 'Email', 'Mobile', 'Action'];

  ngOnInit(): void {
    this.Ms.GetAll().subscribe((result) => {
      console.log(result); // Affichez les données dans la console

      this.dataSource = result;

      
    });
  }

  // Ouvrir le dialog pour ajouter un médecin
  openAddDoctorDialog(): void {
    const dialogRef = this.dialog.open(AddDoctorDialogComponent, {
      width: '600px', // Set the width
      height: '700px', 
    });

   
   // dialogRef.afterClosed().subscribe(result => {
      // Rafraîchir la liste des médecins si nécessaire
     // this.Ms.GetAll().subscribe((result) => {
     //   this.dataSource = result;
    //  });
   // });

   dialogRef.afterClosed().subscribe((result: Doctor | undefined) => {
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
      this.Ms.deleteDoctor(id).subscribe(() => {
        // Supprimer localement le médecin de la liste
        this.dataSource = this.dataSource.filter(doctor => doctor.id !== id);
      });
    }
 }
}