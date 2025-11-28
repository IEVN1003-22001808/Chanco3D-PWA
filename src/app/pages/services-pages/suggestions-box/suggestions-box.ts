import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suggestions-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './suggestions-box.html',
  styleUrl: './suggestions-box.css'
})
export class SuggestionsBoxComponent {

  nuevaSugerencia = { titulo: '', origen: '', detalles: '' };

  sugerencias = [
    { titulo: 'Casco de Spartan', origen: 'Halo', estado: 'Aprobado', usuario: '67', fecha: '2025-11-10' },
    { titulo: 'Espada Maestra Realista', origen: 'Zelda', estado: 'Nuevo', usuario: 'PMpro', fecha: '2025-11-15' },
    { titulo: 'Nave Espacial Low Poly', origen: 'Original', estado: 'Nuevo', usuario: 'DM_Pro', fecha: '2025-11-05' },
    { titulo: 'Dragón Anciano', origen: 'Monster Hunter', estado: 'Aprobado', usuario: 'George', fecha: '2025-11-18' },
    { titulo: 'Kurama (Zorro 9 Colas)', origen: 'Naruto', estado: 'Nuevo', usuario: 'Roch', fecha: '2025-11-19' },
    { titulo: 'Buster Sword', origen: 'Final Fantasy', estado: 'Aprobado', usuario: 'Camacho', fecha: '2025-11-20' },
    { titulo: 'Pokebola Funcional', origen: 'Pokemon', estado: 'Nuevo', usuario: 'hola', fecha: '2025-11-21' }
  ];

  get sugerenciasPublicas() {
    return this.sugerencias;
  }

  enviarSugerencia() {
    if (this.nuevaSugerencia.titulo && this.nuevaSugerencia.origen) {
      this.sugerencias.unshift({
        titulo: this.nuevaSugerencia.titulo,
        origen: this.nuevaSugerencia.origen,
        estado: 'Nuevo',
        usuario: 'Tú (Maker)',
        fecha: new Date().toISOString().split('T')[0]
      });


      this.nuevaSugerencia = { titulo: '', origen: '', detalles: '' };
      alert('¡Gracias! Tu idea ha sido enviada al buzón.');
    } else {
      alert('Por favor completa el título y el origen.');
    }
  }

  obtenerClaseEstado(estado: string): string {
    switch (estado) {
      case 'Aprobado': return 'estado-aprobado';
      default: return 'estado-nuevo';
    }
  }
}