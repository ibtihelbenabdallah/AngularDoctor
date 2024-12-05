import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor.service';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {
  doctor: Doctor | null = null;

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    // Retrieve the doctor ID from the route parameters
    const doctorId = this.route.snapshot.paramMap.get('id');
    if (doctorId) {
      console.log("doctorId",doctorId)
      // Fetch the doctor details from the service
      this.doctorService.getDoctorById(doctorId).subscribe((result: Doctor) => {
        this.doctor = result;
      });
    }
  }
}
