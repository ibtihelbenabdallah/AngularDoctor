import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Initialisation de currentAdminSubject avec la valeur récupérée depuis le localStorage
  private currentAdminSubject: BehaviorSubject<Admin | null> = new BehaviorSubject<Admin | null>(null);

  public currentAdmin$ = this.currentAdminSubject.asObservable();

  constructor() {
    const storedAdmin = localStorage.getItem('currentAdmin');
    // Si l'administrateur est trouvé dans le localStorage, on l'initialise, sinon null
    if (storedAdmin) {
      this.currentAdminSubject.next(JSON.parse(storedAdmin));
    }
  }

  // Méthode pour définir un utilisateur connecté
  setCurrentAdmin(admin: Admin) {
    localStorage.setItem('currentAdmin', JSON.stringify(admin));
    this.currentAdminSubject.next(admin);
  }

  // Méthode pour récupérer l'utilisateur actuel
  getCurrentAdmin(): Admin | null {
    return this.currentAdminSubject.value;
  }

  // Méthode pour déconnecter l'utilisateur
  logout() {
    localStorage.removeItem('currentAdmin');
    this.currentAdminSubject.next(null);
  }
}
