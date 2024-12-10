import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consultation } from '../models/consultation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(private http: HttpClient) {}

  addConsultation(consultation: Consultation): Observable<Consultation> {
    return this.http.post<Consultation>('http://localhost:3000/Consultation', consultation);
  }
}
