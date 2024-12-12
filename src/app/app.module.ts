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
import { AcceuilComponent } from './acceuil/acceuil.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { LoginComponent } from './login/login.component';
import { AddConsultationDialogComponent } from './add-consultation-dialog/add-consultation-dialog.component';
import { FormsModule } from '@angular/forms';
import { ConsultationsComponent } from './consultation/consultation.component';
import { ConsultationDetailsComponent } from './consultation-details/consultation-details.component'; // <-- Import FormsModule



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
    AcceuilComponent,
    LoginComponent,
    AddConsultationDialogComponent,
    ConsultationsComponent,
    ConsultationDetailsComponent
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
  MatToolbarModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  FormsModule

  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
