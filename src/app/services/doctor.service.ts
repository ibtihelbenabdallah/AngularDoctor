import { Injectable } from '@angular/core';
import { forkJoin, Observable, } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../models/doctor';
import { Departement } from '../models/departement';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClient:HttpClient) {}
 
  GetAll(): Observable<any[]> {
    return forkJoin([
      this.httpClient.get<Doctor[]>('http://localhost:3000/Doctor'),
      this.httpClient.get<Departement[]>('http://localhost:3000/Departement')
    ]);
  }

    AddDoctor(d: Doctor): Observable<Doctor> {
      return this.httpClient.post<Doctor>('http://localhost:3000/Doctor', d);
    }

    deleteDoctor(id: string): Observable<void> {
      return this.httpClient.delete<void>(`http://localhost:3000/Doctor/${id}`);
    }
    updateDoctor(d:Doctor,id:string) : Observable<Doctor> 
    {
      return this.httpClient.put<Doctor>(`http://localhost:3000/Doctor/${id}`, d);
    }
    getDoctorById(id:string) : Observable<Doctor> 
    {
      return this.httpClient.get<Doctor>(`http://localhost:3000/Doctor/${id}`);
    }

  }