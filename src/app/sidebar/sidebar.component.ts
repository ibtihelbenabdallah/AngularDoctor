import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Admin } from 'src/app/models/admin';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentAdmin: Admin | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // S'abonner à l'utilisateur connecté, même après un rechargement de page
    this.authService.currentAdmin$.subscribe(admin => {
      this.currentAdmin = admin;
    });
  }
}
