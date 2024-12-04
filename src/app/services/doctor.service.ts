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
    }}
