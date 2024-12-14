import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit{
  patient: Patient | undefined;
  idcourant!: string;
  form!: FormGroup;
  isPopupOpen = false; // Variable pour suivre l'état du pop-up

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.idcourant = this.route.snapshot.params['id'];
    console.log(this.idcourant);

    if (this.idcourant) {
      this.patientService.getPatientById(this.idcourant).subscribe((Patient) => {
        this.patient = Patient;
        this.form = new FormGroup({
          id: new FormControl(Patient.id, [Validators.required]),
            Name: new FormControl(Patient.Name, [Validators.required]),
            Email: new FormControl(Patient.Email, [Validators.required]),
            Mobile: new FormControl(Patient.Mobile, [Validators.required]),
            Disease: new FormControl(Patient.Disease, [Validators.required]),
            Gender: new FormControl(Patient.Gender, [Validators.required]),
            BloodGroup: new FormControl(Patient.BloodGroup, [Validators.required]),

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
      const updatePatient = this.form.value;
      console.log('Données à envoyer:', updatePatient); // Débogage
      this.patientService.updatePatient(updatePatient, this.idcourant).subscribe(
        () => {
          console.log('patient mis à jour avec succès');
          // Mettre à jour l'objet doctor avec les nouvelles informations
          this.patient = { ...this.patient, ...updatePatient };
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
