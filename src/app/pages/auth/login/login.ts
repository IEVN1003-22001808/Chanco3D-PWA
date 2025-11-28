import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service'; // <--- Importar servicio

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  // Creamos el formulario
  formLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  login() {
    if (this.formLogin.invalid) {
      alert('Por favor llena los campos correctamente');
      return;
    }

    // --- CONEXIÓN REAL A LA BD ---
    this.api.login(this.formLogin.value).subscribe({
      next: (res: any) => {
        if (res.exito) {
          // Guardamos sesión en el navegador
          localStorage.setItem('userRole', res.usuario.role);
          localStorage.setItem('userName', res.usuario.nombre);
          localStorage.setItem('userId', res.usuario.id); // Útil para guardar pedidos

          // Redirección según rol
          if (res.usuario.role === 'admin') {
            window.location.href = '/admin/dashboard';
          } else {
            window.location.href = '/home';
          }
        } else {
          alert(res.mensaje); // Ej: "Correo o contraseña incorrectos"
        }
      },
      error: (err) => {
        console.error(err);
        alert('Error al conectar con el servidor.');
      }
    });
  }
}
