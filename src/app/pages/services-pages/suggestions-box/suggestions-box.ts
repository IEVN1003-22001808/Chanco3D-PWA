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
    { title: 'Casco de Spartan', origin: 'Halo', status: 'Aprobada', user: 'MasterChief117', date: '2025-11-10' },
    { title: 'Espada Maestra Realista', origin: 'Zelda', status: 'En Revisión', user: 'LinkFan', date: '2025-11-15' },
    { title: 'Nave Espacial Low Poly', origin: 'Original', status: 'Nueva', user: 'DM_Pro', date: '2025-11-05' },
    { title: 'Dragón Anciano', origin: 'Monster Hunter', status: 'Aprobada', user: 'George', date: '2025-11-18' },
    { title: 'Kurama (Zorro 9 Colas)', origin: 'Naruto', status: 'Nueva', user: 'OtakuBoy', date: '2025-11-19' }
  ];

  get publicSuggestions() {
    return this.suggestions.filter(s => s.status === 'Aprobada');
  }

  // Enviar nueva sugerencia (Simulado)
  submitSuggestion() {
    if (this.newSuggestion.title && this.newSuggestion.origin) {
      this.suggestions.unshift({
        title: this.newSuggestion.title,
        origin: this.newSuggestion.origin,
        status: 'Pendiente',
        user: 'Tú (Maker)',
        date: new Date().toISOString().split('T')[0]
      });
      
  
      this.newSuggestion = { title: '', origin: '', details: '' };
      alert('¡Gracias! Tu idea ha sido enviada al buzón.');
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