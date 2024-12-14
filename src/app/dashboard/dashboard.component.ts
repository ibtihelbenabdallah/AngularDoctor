import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions, BarController } from 'chart.js';

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController  // Register BarController
);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  doctorsCount: number = 0;
  patientsCount: number = 0;
  consultationsCount: number = 0;
  departmentsCount: number = 0;
  departments: any[] = [];
  doctorsByDepartment: { [key: string]: number } = {};
  isLoading: boolean = true;
  barChartChart: Chart | undefined;  // Variable to store the chart instance

  // For accessing the canvas in the template
  @ViewChild('barChart', { static: false }) barChart!: ElementRef<HTMLCanvasElement>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
    this.drawBarChart();
  }

  ngAfterViewInit(): void {
    // Delay drawing the chart until after view initialization
    setTimeout(() => {
      if (this.barChart && this.barChart.nativeElement) {
        this.drawBarChart();
      }
    });
  }

  fetchData(): void {
    this.http.get<any>('/assets/db.json').subscribe(
      (data) => {
        console.log('Data:', data);

        // Calculate counts
        this.doctorsCount = data.Doctor.length;
        this.patientsCount = data.Patient.length;
        this.consultationsCount = data.Consultation.length;
        this.departmentsCount = data.Departement.length;

        // Initialize doctor count by department
        this.departments = data.Departement;
        this.departments.forEach((department) => {
          this.doctorsByDepartment[department.id] = 0;
        });

        // Count doctors per department
        data.Doctor.forEach((doctor: { departementId: string | number }) => {
          this.doctorsByDepartment[doctor.departementId]++;
        });

        console.log('Doctors by Department:', this.doctorsByDepartment);

        // Data has been loaded, now stop loading spinner
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching data', error);
        this.isLoading = false;
      }
    );
  }

  drawBarChart(): void {
    // Prepare chart data
    const departmentLabels = this.departments.map(department => department.description);
    const doctorCounts = this.departments.map(department => this.doctorsByDepartment[department.id] || 0);

    console.log('Department Labels:', departmentLabels);
    console.log('Doctor Counts:', doctorCounts);

    if (departmentLabels.length === 0 || doctorCounts.length === 0) {
      console.error('Labels or data are empty');
      return;
    }

    const chartData = {
      labels: departmentLabels,
      datasets: [
        {
          label: 'Doctors by Department',
          data: doctorCounts,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };

    const chartOptions: ChartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    // Ensure the chart is drawn on the correct canvas element
    if (this.barChart?.nativeElement) {
      // Destroy the existing chart if it exists
      if (this.barChartChart) {
        this.barChartChart.destroy();
      }

      // Create a new chart
      this.barChartChart = new Chart(this.barChart.nativeElement, {
        type: 'bar',
        data: chartData,
        options: chartOptions
      });
    }
  }
}
