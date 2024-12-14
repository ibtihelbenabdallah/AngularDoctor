import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { PatientComponent } from './patient/patient.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { LoginComponent } from './login/login.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { DepartementComponent } from './departement/departement.component';
import { DepartementDetailsComponent } from './departement-details/departement-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsultationDetailsComponent } from './consultation-details/consultation-details.component';


//const routes: Routes = [
 //{path: 'doctors', component: DoctorComponent},
  //{ path: 'doctorDetails/:id', component: DoctorDetailsComponent },
  //{path: 'patients', component: PatientComponent},
  //{ path: 'patientDetails/:id', component: PatientDetailsComponent },
  //
  //{ path: 'login', component: LoginComponent },
  //{ path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirection par défaut vers login
//];
const routes: Routes = [
  // Redirection par défaut vers '/login'
  { path: '', redirectTo: 'acceuil', pathMatch: 'full' },

  // Auth Layout (sans sidebar)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'acceuil', component: AcceuilComponent },
    ],
  },
  // Main Layout (avec sidebar)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      
      { path: 'doctors', component: DoctorComponent },
      { path: 'doctorDetails/:id', component: DoctorDetailsComponent },
      { path: 'patients', component: PatientComponent },
      { path: 'patientDetails/:id', component: PatientDetailsComponent },
      { path: 'consultations', component: ConsultationComponent },
      { path: 'consultationDetails/:id', component: ConsultationDetailsComponent },
      { path: 'departements', component: DepartementComponent },
      { path: 'departementDetails/:id', component: DepartementDetailsComponent },
      { path: 'dashboard', component: DashboardComponent },

    ],
  },

  // Gestion des chemins non définis
  { path: '**', component: NotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
