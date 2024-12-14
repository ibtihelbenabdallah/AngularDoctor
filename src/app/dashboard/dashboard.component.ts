import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js/auto';
import { PatientService } from '../services/patient.service';
import { ConsultationService } from '../services/consultation.service';
import { DoctorService } from '../services/doctor.service';
import { DepartementService } from '../services/departement.service';
import { Departement } from '../models/departement';
import { Doctor } from '../models/doctor';
import { Patient } from '../models/patient';
import { Consultation } from '../models/consultation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    this.loadDoctorsByDepartment();
    this.loadConsultationsByDoctor();
    this.loadCounts();
  }
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  // Renamed for clarity
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Number of Doctors by Department',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  public pieChartLabelsByDoctor: string[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  public pieChartDataByDoctor: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF5733'],
      },
    ],
  };



  doctorsCount: number = 0;
  patientsCount: number = 0;
  consultationsCount: number = 0;
  departmentsCount: number = 0;

  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private consultationService: ConsultationService,
    private departementService: DepartementService,
    private cdr: ChangeDetectorRef
  ) {}



  // Logic to load the doctors by department
  loadDoctorsByDepartment(): void {
    this.doctorService.GetAll().subscribe(([doctors, departments]) => {
      // Initialize an empty object to count doctors per department
      const departmentCounts: { [key: string]: number } = {};

      // Ensure each department has a count initialized to 0
      departments.forEach((department: Departement) => {
        departmentCounts[department.description] = 0;
      });

      // Count the number of doctors in each department based on departmentId
      doctors.forEach((doctor: Doctor) => {
        const department = departments.find((dept: { id: string; }) => dept.id === doctor.departementId);
        if (department) {
          departmentCounts[department.description] = (departmentCounts[department.description] || 0) + 1;
        }
      });

      // Set the labels and data for the chart
      this.barChartLabels = Object.keys(departmentCounts);
      this.barChartData = {
        ...this.barChartData,
        labels: this.barChartLabels,
        datasets: [
          {
            ...this.barChartData.datasets[0],
            data: Object.values(departmentCounts),
          },
        ],
      };
    });
  }

loadConsultationsByDoctor(): void {
  this.consultationService.getConsultations().subscribe((consultations: Consultation[]) => {
    const consultationsByDoctorCounts: { [key: string]: number } = {};
    consultations.forEach((consultation: Consultation) => {
      const doctorName = consultation.DoctorName || 'Unknown Doctor';
      consultationsByDoctorCounts[doctorName] = (consultationsByDoctorCounts[doctorName] || 0) + 1;
    });

    this.pieChartLabelsByDoctor = Object.keys(consultationsByDoctorCounts);
    this.pieChartDataByDoctor = {
      labels: this.pieChartLabelsByDoctor,
      datasets: [{
        data: Object.values(consultationsByDoctorCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF5733'],
      }]
    };

    // Trigger change detection for both charts
    this.cdr.detectChanges();  // Trigger change detection for both charts
  });
}

  // Load counts for doctors, patients, consultations, and departments
  loadCounts(): void {
    // Load patients count
    this.patientService.GetAll().subscribe((patients) => {
      console.log('Patients:', patients); // Log patients
      this.patientsCount = patients.length;
    });

    // Load consultations count
    this.consultationService.getConsultations().subscribe((consultations) => {
      console.log('Consultations count:', consultations); // Log consultations count
      this.consultationsCount = consultations.length;
    });
    this.departementService.GetAll().subscribe((departements) => {
      console.log('Consultations count:', departements); // Log consultations count
      this.departmentsCount = departements.length;
    });

    this.doctorService.GetAll().subscribe((doctors) => {
      console.log('Consultations count:', doctors); // Log consultations count
      this.doctorsCount = doctors.length;
    });
  }
} 
