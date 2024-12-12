import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/patient';
@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClient:HttpClient) {}
 
  GetAll() : Observable<Patient[]> 
  {
    return this.httpClient.get<Patient[]>('http://localhost:3000/Patient')
  }

  AddPatient(P: Patient): Observable<Patient> {
    return this.httpClient.post<Patient>('http://localhost:3000/Patient', P);
  }

  deletePatient(id: string): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:3000/Patient/${id}`);
  }
  updatePatient(P:Patient,id:string) : Observable<void> 
  {
    return this.httpClient.put<void>(`http://localhost:3000/Patient/${id}`, P);
  }
  getPatientById(id:string) : Observable<Patient> 
  {
    return this.httpClient.get<Patient>(`http://localhost:3000/Patient/${id}`);
  }

  
}