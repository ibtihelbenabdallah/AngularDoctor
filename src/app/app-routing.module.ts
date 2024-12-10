import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { PatientComponent } from './patient/patient.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { LoginComponent } from './login/login.component';
import { AddConsultationDialogComponent } from './add-consultation-dialog/add-consultation-dialog.component';

const routes: Routes = [
  { path: '', component: AcceuilComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'consultation', component:  AddConsultationDialogComponent},  // Login route
  // Login route
  { path: 'doctors', component: DoctorComponent },
  { path: 'doctorDetails/:id', component: DoctorDetailsComponent },
  { path: 'patients', component: PatientComponent },
  { path: 'patientDetails/:id', component: PatientDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
