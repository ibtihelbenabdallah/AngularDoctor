import { Component, OnInit } from '@angular/core';
import { Departement } from '../models/departement';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DepartementService } from '../services/departement.service';

@Component({
  selector: 'app-departement-details',
  templateUrl: './departement-details.component.html',
  styleUrls: ['./departement-details.component.css']
})
export class DepartementDetailsComponent implements OnInit {
  departement : Departement | undefined;
  idcourant!: string;
  form!: FormGroup;
  isPopupOpen = false; // Variable pour suivre l'état du pop-up

  constructor(
    private route: ActivatedRoute,
    private departementService: DepartementService
  ) {}

  ngOnInit(): void {
    this.idcourant = this.route.snapshot.params['id'];
    console.log(this.idcourant);

    if (this.idcourant) {
      this.departementService.getDepartementById(this.idcourant).subscribe((Departement) => {
        this.departement = Departement;
        this.form = new FormGroup({
          id: new FormControl(Departement.id, [Validators.required]),
          description: new FormControl(Departement.description, [Validators.required]),
          specialisation: new FormControl(Departement.specialisation, [Validators.required]),
            
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
      const updatedDepartement = this.form.value;
      console.log('Données à envoyer:', updatedDepartement); // Débogage
      this.departementService.updateDepartement(updatedDepartement, this.idcourant).subscribe(
        () => {
          console.log('Departement mis à jour avec succès');
          // Mettre à jour l'objet doctor avec les nouvelles informations
          this.departement = { ...this.departement, ...updatedDepartement };
          this.closePopup();
          // Vous pouvez également recharger les données en appelant getDoctorById à nouveau pour garantir que vous avez les dernières informations.
          // this.doctorService.getDoctorById(this.idcourant).subscribe((updatedDoctor) => {
          //   this.doctor = updatedDoctor;
          // });
        },
        (error) => {
          console.error('Erreur lors de la mise à jour:', error); // Détecte les erreurs
        }
      );
    }
  }
}

