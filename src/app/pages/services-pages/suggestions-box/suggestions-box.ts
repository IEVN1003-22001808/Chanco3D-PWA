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
  
  newSuggestion = { title: '', origin: '', details: '' };

  // Mock Data: Sugerencias existentes con diferentes estados
  suggestions = [
    { title: 'Casco de Spartan', origin: 'Halo', status: 'Aprobada', user: 'MasterChief117' },
    { title: 'Espada Maestra Realista', origin: 'Zelda', status: 'En Revisión', user: 'LinkFan' },
    { title: 'Nave Espacial Low Poly', origin: 'Original', status: 'Nueva', user: 'DM_Pro' },
    { title: 'Dragón Anciano', origin: 'Monster Hunter', status: 'Aprobada', user: 'George' },
    { title: 'Kurama (Zorro 9 Colas)', origin: 'Naruto', status: 'Nueva', user: 'OtakuBoy' }
  ];

  // Enviar nueva sugerencia (Simulado)
  submitSuggestion() {
    if (this.newSuggestion.title && this.newSuggestion.origin) {
      this.suggestions.unshift({
        title: this.newSuggestion.title,
        origin: this.newSuggestion.origin,
        status: 'Nueva', // Por defecto entra como nueva [cite: 455]
        user: 'Tú (Maker)'
      });
      
      // Limpiar formulario
      this.newSuggestion = { title: '', origin: '', details: '' };
      alert('¡Gracias! Tu idea ha sido enviada al buzón. 📬');
    } else {
      alert('Por favor completa el título y el origen.');
    }
  }

  // Helper para clases CSS según estado
  getStatusClass(status: string): string {
    switch (status) {
      case 'Aprobada': return 'status-approved';
      case 'En Revisión': return 'status-review';
      default: return 'status-new';
    }
  }
}