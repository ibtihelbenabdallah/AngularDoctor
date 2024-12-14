import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ConsultationService } from '../services/consultation.service';
import { MatDialog } from '@angular/material/dialog';
import { AddConsultationDialogComponent } from '../add-consultation-dialog/add-consultation-dialog.component';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
  consultations: any[] = [];
  displayedColumns: string[] = ['id', 'patientName', 'doctorName', 'date',  'actions'];

  constructor(
    private consultationService: ConsultationService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadConsultations();
  }

  loadConsultations(): void {
    this.consultationService.getConsultations().subscribe(
      (data) => {
        this.consultations = data;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching consultations:', error);
      }
    );
  }

  deleteConsultation(id: string): void {
    if (confirm('Are you sure you want to delete this consultation?')) {
      this.consultationService.deleteConsultation(id).subscribe(
        () => this.loadConsultations(),
        (error) => {
          console.error('Error deleting consultation:', error);
        }
      );
    }
  }

  openAddConsultationDialog(): void {
    const dialogRef = this.dialog.open(AddConsultationDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadConsultations();
      }
    });
  }
}