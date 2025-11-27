import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {
  email: string = '';
  isLoading: boolean = false;
  emailSent: boolean = false;

  onSubmit() {
    if (!this.email) return;

    this.isLoading = true;

    // Simulamos una petición al servidor (Backend)
    setTimeout(() => {
      this.isLoading = false;
      this.emailSent = true; // Cambiamos la vista al mensaje de éxito
    }, 1500);
  }
}