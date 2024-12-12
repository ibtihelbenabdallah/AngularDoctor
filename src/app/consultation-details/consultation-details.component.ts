
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConsultationService } from '../services/consultation.service';

@Component({
  selector: 'app-consultation-details',
  templateUrl: './consultation-details.component.html',
  styleUrls: ['./consultation-details.component.css']
})
export class ConsultationDetailsComponent implements OnInit {
  consultation: any = null;
  isPopupOpen = false;
  form!: FormGroup;
  consultationId: string | null = null;
  doctorName: string = '';
  patientName: string = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private consultationService: ConsultationService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const consultationId = this.route.snapshot.paramMap.get('id');
    if (consultationId) {
      this.consultationService.getConsultationById(consultationId).subscribe(data => {
        this.consultation = data;
        this.initializeForm();
      }, error => {
        console.error("Error fetching consultation:", error);
      });
    } else {
      console.error("Consultation ID is undefined");
    }
  }

  // Initialize form with current consultation data
  initializeForm(): void {
    this.form = this.fb.group({
      patientName: [this.consultation.patientName],
      doctorName: [this.consultation.doctorName],
      date: [this.consultation.date],
      time: [this.consultation.time],
      notes: [this.consultation.notes]
    });
  }

  openEditPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  onSubmit(): void {
    if (this.form.valid) {
      // Handle the form submission to update the consultation
      const updatedConsultation = this.form.value;
      this.consultationService.updateConsultation(this.consultation.id, updatedConsultation).subscribe(() => {
        this.isPopupOpen = false;
        alert('Consultation updated successfully!');
      }, error => {
        console.error('Error updating consultation:', error);
      });
    }
  }
}
