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

  // simula el envio del correo de recuperacion
  onSubmit() {
    if (!this.email) return;

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.emailSent = true;
    }, 1500);
  }
}