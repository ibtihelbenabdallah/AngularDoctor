import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../models/doctor';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClient:HttpClient) {}
 
    GetAll() : Observable<Doctor[]> 
    {
      return this.httpClient.get<Doctor[]>('http://localhost:3000/Doctor')
    }
  
    AddDoctor(d: Doctor): Observable<Doctor> {
      return this.httpClient.post<Doctor>('http://localhost:3000/Doctor', d);
    }

    deleteDoctor(id: string): Observable<void> {
      return this.httpClient.delete<void>(`http://localhost:3000/Doctor/${id}`);
    }
    updateDoctor(d:Doctor,id:string) : Observable<void> 
    {
      return this.httpClient.put<void>(`http://localhost:3000/Doctor/${id}`, d);
    }
    getDoctorById(id:string) : Observable<Doctor> 
    {
      return this.httpClient.get<Doctor>(`http://localhost:3000/Doctor/${id}`);
    }

  }