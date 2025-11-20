import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common'; // Agregamos CommonModule para el *ngIf
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule], // Importante: CommonModule
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit {

  // Variables de Tema
  isDarkMode = true;

  // Variables de Auth
  isAdmin = false;
  isClient = false;
  isLoggedIn = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // 1. Checar Tema (Tu lógica original)
    // const savedTheme = localStorage.getItem('theme'); ...

    // 2. Checar Auth (NUEVA LÓGICA)
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
    // Borrar datos y recargar para ir al login limpio
    localStorage.clear();
    window.location.href = '/auth/login';
  }
}
