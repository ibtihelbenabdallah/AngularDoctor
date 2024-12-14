import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor.service';
import { DepartementService } from '../services/departement.service'; // Importer le service des départements
import { Doctor } from '../models/doctor';
import { Departement } from '../models/departement';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {
  doctor: Doctor | undefined;
  departements: Departement[] = []; // Liste des départements
  idcourant!: string;
  form!: FormGroup;
  isPopupOpen = false; // Variable pour suivre l'état du pop-up

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private departementService: DepartementService // Injecter le service des départements
  ) {}

  ngOnInit(): void {
    this.idcourant = this.route.snapshot.params['id'];
    console.log(this.idcourant);
  
    // Charger les départements
    this.departementService.GetAll().subscribe((departements) => {
      this.departements = departements;
    });
  
    // Charger les informations du médecin
    if (this.idcourant) {
      this.doctorService.getDoctorById(this.idcourant).subscribe((doctor) => {
        this.doctor = doctor;
  
        // Charger le département associé au médecin
        if (this.doctor?.departementId) {
          this.departementService.getDepartementById(this.doctor.departementId).subscribe((departement) => {
            // Assigner le département au médecin
            if (this.doctor) {
              this.doctor.Department = departement; // Assurez-vous que la propriété `Department` existe
            }
          });
        }
  
        // Créer le formulaire
        this.form = new FormGroup({
          id: new FormControl(doctor.id, [Validators.required]),
          Name: new FormControl(doctor.Name, [Validators.required]),
          Specialization: new FormControl(doctor.Specialization, [Validators.required]),
          Email: new FormControl(doctor.Email, [Validators.required]),
          Mobile: new FormControl(doctor.Mobile, [Validators.required]),
          departementId: new FormControl(doctor.departementId, [Validators.required]), // Ajouter le champ departementId
        });
      });
    }
  }

  openEditPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedDoctor = this.form.value;
      console.log('Données à envoyer:', updatedDoctor); // Débogage
      this.doctorService.updateDoctor(updatedDoctor, this.idcourant).subscribe(
        (updatedDoctorResponse) => {
          console.log('Médecin mis à jour avec succès');
          
          // Mettre à jour l'objet doctor avec les nouvelles informations
          if (this.doctor) {
            this.doctor = { 
              ...this.doctor, 
              ...updatedDoctorResponse, 
              departementId: updatedDoctorResponse.departementId 
            };
          }

          // Recharger le département associé après la mise à jour, si nécessaire
          if (this.doctor && this.doctor.departementId) {
            this.departementService.getDepartementById(this.doctor.departementId).subscribe((departement) => {
              if (this.doctor) {
                this.doctor.Department = departement;  // Mettre à jour le département du médecin
              }
            });
          }

          this.closePopup();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour:', error); // Détecte les erreurs
        }
      );
    }
  }
}
