import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'doctor-appointment';
  showSidebar: boolean = true; // Sidebar is visible by default

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Hide sidebar for specific routes
        const hiddenRoutes = ['/login','/']; // Add the route paths where you don't want the sidebar
        this.showSidebar = !hiddenRoutes.includes(event.urlAfterRedirects);
      }
    });
  }
}
