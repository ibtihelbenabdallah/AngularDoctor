import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consultation } from '../models/consultation';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { PatientService } from './patient.service';
import { DoctorService } from './doctor.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(
    private http: HttpClient,
    private patientService: PatientService,
    private doctorService: DoctorService
  ) {}

  addConsultation(consultation: Consultation): Observable<Consultation> {
    return this.http.post<Consultation>('http://localhost:3000/Consultation', consultation);
  }



  deleteConsultation(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/Consultation/${id}`);
  }

  


  getConsultations(): Observable<any[]> {
    return this.http.get<Consultation[]>('http://localhost:3000/Consultation').pipe(
      switchMap((consultations) => {
        if (!consultations || consultations.length === 0) {
          return of([]);
        }

        // Fetch patient and doctor information
        const patientRequests = consultations.map((c) =>
          c.PatientName ? this.patientService.getPatientById(c.PatientName).pipe(catchError(() => of(null))) : of(null)
        );
        const doctorRequests = consultations.map((c) =>
          c.DoctorName ? this.doctorService.getDoctorById(c.DoctorName).pipe(catchError(() => of(null))) : of(null)
        
        );

        return forkJoin([forkJoin(patientRequests), forkJoin(doctorRequests)]).pipe(
          map(([patients, doctors]) => {
            return consultations.map((consultation, index) => {
              const patient = patients[index];
              const doctor = doctors[index];
              return {
                ...consultation,
                patientName: patient ? patient.Name : 'Unknown',
                doctorName: doctor ? doctor.Name : 'Unknown',
              };
            });
          })
        );
      }),
      catchError((error) => {
        console.error('Error fetching consultations:', error);
        return of([]);
      })
    );
  }
  getConsultationById(id: string): Observable<any> {
    return this.http.get<Consultation>(`http://localhost:3000/Consultation/${id}`).pipe(
      switchMap((consultation) => {
        if (!consultation) return of(null);
  
        const patientRequest = consultation.PatientName
          ? this.patientService.getPatientById(consultation.PatientName).pipe(catchError(() => of(null)))
          : of(null);
  
        const doctorRequest = consultation.DoctorName
          ? this.doctorService.getDoctorById(consultation.DoctorName).pipe(catchError(() => of(null)))
          : of(null);
  
        return forkJoin([patientRequest, doctorRequest]).pipe(
          map(([patient, doctor]) => ({
            ...consultation,
            patientName: patient ? patient.Name : 'Unknown',
            doctorName: doctor ? doctor.Name : 'Unknown',
          }))
        );
      }),
      catchError((error) => {
        console.error('Error fetching consultation details:', error);
        return of(null);
      })
    );
  }
  
  updateConsultation(id: string, consultation: Consultation): Observable<Consultation> {
    return this.http.put<Consultation>(`http://localhost:3000/Consultation/${id}`, consultation);
  }
  

}