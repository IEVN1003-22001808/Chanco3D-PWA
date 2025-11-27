import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importante para formularios

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule], // Agregamos ReactiveFormsModule
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  // Inyección de dependencias (Estilo moderno Angular)
  private fb = inject(FormBuilder);
  private router = inject(Router);

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

    const email = this.formLogin.value.email;
    const password = this.formLogin.value.password;

    // 2. Validación "Trucada"
    if (email === 'admin@chanco.com' && password === 'admin123') {

      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userName', 'Administrador');

      // TRUCO: Usamos window.location.href en lugar de router.navigate
      // para forzar que la página se recargue y el Navbar detecte el cambio.
      window.location.href = '/admin';

    } else {
      // Cliente normal
      localStorage.setItem('userRole', 'client');
      localStorage.setItem('userName', 'Cliente Chanco');

      // Forzamos recarga hacia la tienda
      window.location.href = '/shop/catalog';
    }
  }
}
