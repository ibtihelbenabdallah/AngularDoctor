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
    private doctorService: DoctorService,
    public dialog: MatDialog,
  ) {}

  displayedColumns: string[] = ['Id', 'Name', 'Specialization', 'Department', 'Email', 'Mobile', 'Action'];

  ngOnInit(): void {
    this.doctorService.GetAll().subscribe(([doctors, departments]) => {
      // Associer chaque médecin avec son département en utilisant departementId
      this.dataSource = doctors.map((doctor: { departementId: any; }) => {
        const department = departments.find((dept: { id: any; }) => dept.id === doctor.departementId);
        return {
          ...doctor,
          departmentName: department ? department.description : 'N/A'  // Ajouter le nom du département
        };
      });
    });
  }

  openAddDoctorDialog(): void {
    const dialogRef = this.dialog.open(AddDoctorDialogComponent, {
      width: '600px',
      height: '700px',
    });

    dialogRef.afterClosed().subscribe((result: Doctor | undefined) => {
      if (result) {
        this.dataSource = [...this.dataSource, result];
      } else {
        this.doctorService.GetAll().subscribe(([doctors, departments]) => {
          this.dataSource = doctors.map((doctor: { departementId: any; }) => {
            const department = departments.find((dept: { id: any; }) => dept.id === doctor.departementId);
            return {
              ...doctor,
              departmentName: department ? department.description : 'N/A'
            };
          });
        });
      }
    });
  }

  delete(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce médecin ?')) {
      this.doctorService.deleteDoctor(id).subscribe(() => {
        this.doctorService.GetAll().subscribe(([doctors, departments]) => {
          this.dataSource = doctors.map((doctor: { departementId: any; }) => {
            const department = departments.find((dept: { id: any; }) => dept.id === doctor.departementId);
            return {
              ...doctor,
              departmentName: department ? department.description : 'N/A'
            };
          });
        });
      });
    }
  }
}
