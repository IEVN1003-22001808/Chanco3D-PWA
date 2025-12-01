import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-suggestions-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './suggestions-box.html',
  styleUrl: './suggestions-box.css'
})
export class SuggestionsBoxComponent implements OnInit {
  private api = inject(ApiService);

  nuevaSugerencia = { titulo: '', origen: '', detalles: '' };
  sugerencias: any[] = [];

  // al iniciar cargamos las sugerencias
  ngOnInit() {
    this.cargarSugerencias();
  }

  // obtiene las sugerencias desde la api
  cargarSugerencias() {
    this.api.getSugerencias().subscribe((data: any) => {
      this.sugerencias = data;
    });
  }

  // obtiene las sugerencias publicas
  get sugerenciasPublicas() {
    return this.sugerencias;
  }

  // verifica si el usuario esta logueado
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }

  // enviam una nueva sugerencia
  enviarSugerencia() {
    const usuarioActual = localStorage.getItem('userName');

    if (!usuarioActual) {
      alert('Debes iniciar sesión para sugerir.');
      return;
    }

    if (this.nuevaSugerencia.titulo && this.nuevaSugerencia.origen) {
      const data = {
        title: this.nuevaSugerencia.titulo,
        origin: this.nuevaSugerencia.origen,
        detalles: this.nuevaSugerencia.detalles,
        usuario: usuarioActual
      };

      this.api.postSugerencia(data).subscribe({
        next: () => {
          alert('¡Gracias! Tu idea ha sido enviada al buzón.');
          this.nuevaSugerencia = { titulo: '', origen: '', detalles: '' };
          this.cargarSugerencias();
        },
        error: () => alert('Error al enviar.')
      });

    } else {
      alert('Por favor completa el título y el origen.');
    }
  }

  // obtiene la clase css segun el estado de la sugerencia
  obtenerClaseEstado(estado: string): string {
    switch (estado) {
      case 'Aprobada': return 'estado-aprobado';
      case 'Nueva': return 'estado-nuevo';
      case 'Pendiente': return 'estado-pendiente';
      default: return '';
    }
  }
}
