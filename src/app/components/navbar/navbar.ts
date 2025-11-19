import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  isDarkMode = true; // Empezamos oscuros

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    // Checar preferencia guardada (Opcional)
    // const savedTheme = localStorage.getItem('theme');
    // if (savedTheme === 'light') { this.isDarkMode = false; this.updateTheme(); }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.updateTheme();
  }

  updateTheme() {
    if (this.isDarkMode) {
      this.renderer.removeClass(this.document.body, 'light-theme');
      // localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.addClass(this.document.body, 'light-theme');
      // localStorage.setItem('theme', 'light');
    }
  }
}