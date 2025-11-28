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

  ngOnInit() {
    this.cargarSugerencias();
  }

  cargarSugerencias() {
    this.api.getSugerencias().subscribe((data: any) => {
      this.sugerencias = data;
    });
  }

  get sugerenciasPublicas() {
    return this.sugerencias;
  }

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
          this.cargarSugerencias(); // Actualizar lista
        },
        error: () => alert('Error al enviar.')
      });

    } else {
      alert('Por favor completa el título y el origen.');
    }
  }

  obtenerClaseEstado(estado: string): string {
    switch (estado) {
      case 'Aprobada': return 'estado-aprobado';
      case 'Nueva': return 'estado-nuevo'; // CSS verde o azul
      case 'Pendiente': return 'estado-pendiente'; // CSS amarillo
      default: return '';
    }
  }
}
