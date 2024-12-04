import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    public dialog: MatDialog
  ) {}

  displayedColumns: string[] = ['Id', 'Name', 'Specialization', 'Email', 'Mobile', 'Action'];

  ngOnInit(): void {
    this.Ms.GetAll().subscribe((result) => {
      this.dataSource = result;
    });
  }

  // Ouvrir le dialog pour ajouter un médecin
  openAddDoctorDialog(): void {
    const dialogRef = this.dialog.open(AddDoctorDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Rafraîchir la liste des médecins si nécessaire
      this.Ms.GetAll().subscribe((result) => {
        this.dataSource = result;
      });
    });
  }
}
