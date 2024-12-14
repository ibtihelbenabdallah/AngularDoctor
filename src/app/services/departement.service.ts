import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement } from '../models/departement';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  constructor(private httpClient:HttpClient) {}
 
    GetAll() : Observable<Departement[]> 
    {
      return this.httpClient.get<Departement[]>('http://localhost:3000/Departement')
    }
  
    AddDepartement(d: Departement): Observable<Departement> {
      return this.httpClient.post<Departement>('http://localhost:3000/Departement', d);
    }

    deleteDepartement(id: string): Observable<void> {
      return this.httpClient.delete<void>(`http://localhost:3000/Departement/${id}`);
    }
    updateDepartement(d:Departement,id:string) : Observable<void> 
    {
      return this.httpClient.put<void>(`http://localhost:3000/Departement/${id}`, d);
    }
    getDepartementById(id:string) : Observable<Departement> 
    {
      return this.httpClient.get<Departement>(`http://localhost:3000/Departement/${id}`);
    }

  }