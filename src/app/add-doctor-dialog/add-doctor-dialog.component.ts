import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../services/doctor.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-doctor-dialog',
  templateUrl: './add-doctor-dialog.component.html',
  styleUrls: ['./add-doctor-dialog.component.css']
})
export class AddDoctorDialogComponent {

  addDoctorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    public dialogRef: MatDialogRef<AddDoctorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addDoctorForm = this.fb.group({
      Name: ['', Validators.required],
      Specialization: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Mobile: ['', Validators.required],
      Gender: ['', Validators.required],
      Education: ['', Validators.required],
      Experience: ['', Validators.required],
      StartHour: ['', Validators.required],
      EndHour: ['', Validators.required],
      DutyTiming: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addDoctor(): void {
    if (this.addDoctorForm.valid) {
      const doctorData = this.addDoctorForm.value;
      // Call service to save doctor
      this.doctorService.AddDoctor(doctorData).subscribe(response => {
        console.log('Doctor added successfully!', response);
        this.dialogRef.close();
      }, error => {
        console.error('Error adding doctor', error);
      });
    }
  }
}