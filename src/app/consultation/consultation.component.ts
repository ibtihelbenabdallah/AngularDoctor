import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConsultationService } from '../services/consultation.service';
import { AddConsultationDialogComponent } from '../add-consultation-dialog/add-consultation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationsComponent implements OnInit {
  consultations: any[] = [];
  displayedColumns: string[] = ['id', 'patientName', 'doctorName', 'date', 'reason', 'notes', 'actions'];

  constructor(private router: Router,
    private consultationService: ConsultationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadConsultations();
  }

  loadConsultations(): void {
    this.consultationService.getConsultations().subscribe(
      (data) => {
        this.consultations = data;
      },
      (error) => {
        console.error('Error fetching consultations:', error);
      }
    );
  }

  deleteConsultation(id: string): void {
    const confirmed = confirm('Are you sure you want to delete this consultation?');
    if (confirmed) {
      this.consultationService.deleteConsultation(id).subscribe(
        () => {
          this.consultations = this.consultations.filter((c) => c.id !== id);
        },
        (error) => {
          console.error('Error deleting consultation:', error);
        }
      );
    }
  }

  editConsultation(consultation: any): void {
    console.log('Edit consultation:', consultation);
  }

  // Open dialog to add a new consultation
  openAddConsultationDialog(): void {
    const dialogRef = this.dialog.open(AddConsultationDialogComponent, {
      width: '500px',
      data: {} // Pass data if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadConsultations();  // Refresh the consultations list after closing the dialog
      }
    });
  }
  viewDetails(consultationId: string, doctorName: string, patientName: string): void {
    this.router.navigate(['/consultationDetails', consultationId], {
      state: {
        doctorName: doctorName,
        patientName: patientName
      }
    });
  }
}
