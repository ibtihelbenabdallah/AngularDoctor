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



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DoctorComponent,
    DoctorDetailsComponent,
    AddDoctorDialogComponent
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
  MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
