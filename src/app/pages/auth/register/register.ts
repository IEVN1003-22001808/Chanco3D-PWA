import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);

  formRegister: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],

    terms: [false, Validators.requiredTrue]
  });

  // envia el formulario de registro a la api
  onSubmit() {
    if (this.formRegister.valid) {
      this.api.registro(this.formRegister.value).subscribe({
        next: (res: any) => {
          if (res.exito) {
            alert('¡Cuenta creada con éxito! Ahora inicia sesión.');
            this.router.navigate(['/auth/login']);
          } else {
            alert('Error: ' + res.mensaje);
          }
        },
        error: (err) => alert('Error de conexión con la API')
      });
    } else {
      alert('Por favor completa todos los campos correctamente.');
    }
  }
}
