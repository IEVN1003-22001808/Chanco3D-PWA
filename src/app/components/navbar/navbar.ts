import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common'; 
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule], 
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit {


  isDarkMode = true;
  isAdmin = false;
  isClient = false;
  isLoggedIn = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit() {

    const role = localStorage.getItem('userRole');

    if (role) {
      this.isLoggedIn = true;
      if (role === 'admin') {
        this.isAdmin = true;
      } else if (role === 'client') {
        this.isClient = true;
      }
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.updateTheme();
  }

  updateTheme() {
    if (this.isDarkMode) {
      this.renderer.removeClass(this.document.body, 'light-theme');
    } else {
      this.renderer.addClass(this.document.body, 'light-theme');
    }
  }

  logout() {
   
    localStorage.clear();
    window.location.href = '/auth/login';
  }
}
