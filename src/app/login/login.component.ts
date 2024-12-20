import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  errorMessage: string = '';

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialiser correctement le formulaire avec les contrôles
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    const { email, password } = this.loginform.value;
  
    this.loginService.login(email, password).subscribe(
      (admin) => {
        if (admin) {
          // Si l'admin existe, rediriger vers la page protégée
          this.router.navigate(['/dashboard']);
        } else {
          // Si l'admin n'existe pas, afficher un message d'erreur
          this.errorMessage = 'Email ou mot de passe incorrect';
          alert(this.errorMessage); // Alerte spécifique
        }
      },
      (error) => {
        // En cas d'erreur API, afficher un message
        this.errorMessage = 'Une erreur est survenue lors de la connexion';
        alert(this.errorMessage); // Alerte pour erreur API
      }
    );
  }
}  