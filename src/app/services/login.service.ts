import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/admin';  // URL de l'API JSON Server pour les admins

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Admin | undefined> {
    return this.http.get<Admin[]>(this.apiUrl).pipe(
      map((admins) => {
        // Log pour vérifier si l'API renvoie bien des données
        console.log('Admins récupérés:', admins);

        const admin = admins.find((admin) => admin.email === email && admin.password === password);
        if (admin) {
          console.log('Admin trouvé:', admin);  // Vérification si un admin est trouvé
        }
        return admin;
      }),
      catchError((error) => {
        console.error('Erreur API:', error);
        throw new Error('Erreur de connexion');
      })
    );
  }
}
