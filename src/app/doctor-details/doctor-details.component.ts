import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor.service';
import { Doctor } from '../models/doctor';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {
  doctor: Doctor | undefined;
  idcourant!: string;
  form!: FormGroup;
  isPopupOpen = false; // Variable pour suivre l'état du pop-up

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.idcourant = this.route.snapshot.params['id'];
    console.log(this.idcourant);

    if (this.idcourant) {
      this.doctorService.getDoctorById(this.idcourant).subscribe((Doctor) => {
        this.doctor = Doctor;
        this.form = new FormGroup({
            id: new FormControl(Doctor.id, [Validators.required]),
            Name: new FormControl(Doctor.Name, [Validators.required]),
            Specialization: new FormControl(Doctor.Specialization, [Validators.required]),
            Email: new FormControl(Doctor.Email, [Validators.required]),
            Mobile: new FormControl(Doctor.Mobile, [Validators.required]),
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
        () => {
          console.log('Médecin mis à jour avec succès');
          // Mettre à jour l'objet doctor avec les nouvelles informations
          this.doctor = { ...this.doctor, ...updatedDoctor };
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
