import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DoctorComponent } from './doctor/doctor.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AddDoctorDialogComponent } from './add-doctor-dialog/add-doctor-dialog.component';  // Si ce composant est dans un autre fichier, importez-le
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { PatientComponent } from './patient/patient.component';
import { AddPatientDialogComponent } from './add-patient-dialog/add-patient-dialog.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { AddConsultationDialogComponent } from './add-consultation-dialog/add-consultation-dialog.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Ajoutez cette ligne

import { ConsultationService } from './services/consultation.service';
import { DoctorService } from './services/doctor.service';
import { PatientService } from './services/patient.service';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { DepartementComponent } from './departement/departement.component';
import { AddDepartementDialogComponent } from './add-departement-dialog/add-departement-dialog.component';
import { DepartementDetailsComponent } from './departement-details/departement-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsultationDetailsComponent } from './consultation-details/consultation-details.component';

// Importation du module Charts



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DoctorComponent,
    DoctorDetailsComponent,
    AddDoctorDialogComponent,
    PatientComponent,
    AddPatientDialogComponent,
    PatientDetailsComponent,
    ConsultationComponent,
    AddConsultationDialogComponent,
    LoginComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    AcceuilComponent,
    DepartementComponent,
    AddDepartementDialogComponent,
    DepartementDetailsComponent,
    NotFoundComponent,
    DashboardComponent,
    ConsultationDetailsComponent,
    
  ],
  imports: [
    BrowserModule,
  MatDialogModule,
  AppRoutingModule,
  HttpClientModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule,
  MatIconModule, 
  BrowserAnimationsModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  MatCardModule,
  MatRadioModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  
  ],
  providers: [ConsultationService, DoctorService, PatientService,LoginComponent,MatNativeDateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
