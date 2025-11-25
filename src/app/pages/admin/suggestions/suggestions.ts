import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-suggestions-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './suggestions.html',
  styleUrl: './suggestions.css'
})
export class SuggestionsComponent {
  
  suggestions = [
    { id: 1, title: 'Casco de Spartan', origin: 'Halo', status: 'Aprobada', user: 'MasterChief117', date: '2025-11-10' },
    { id: 2, title: 'Espada Maestra Realista', origin: 'Zelda', status: 'En Revisión', user: 'LinkFan', date: '2025-11-15' },
    { id: 3, title: 'Nave Espacial Low Poly', origin: 'Original', status: 'Pendiente', user: 'George', date: '2025-11-18' },
    { id: 4, title: 'Cubo de Compañía', origin: 'Portal', status: 'Rechazada', user: 'GlaDOS', date: '2025-11-20' }
  ];

  updateStatus(item: any, newStatus: string) {
    item.status = newStatus;
    console.log(`Estado de "${item.title}" cambiado a: ${newStatus}`);
  }

  getClass(status: string): string {
    switch(status) {
      case 'Aprobada': return 'exito';
      case 'En Revisión': return 'advertencia';
      case 'Rechazada': return 'peligro';
      default: return 'pendiente';
    }
  }
}