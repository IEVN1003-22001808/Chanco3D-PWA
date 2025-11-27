import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Sugerencia {
  id: number;
  titulo: string;
  origen: string;
  detalles: string;
  usuario: string;
  estado: 'Pendiente' | 'Aprobada' | 'Rechazada';
}

@Component({
  selector: 'app-suggestion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suggestion.html',
  styleUrl: './suggestion.css'
})
export class SuggestionComponent {
  // Datos de prueba simulados
  sugerencias: Sugerencia[] = [
    {
      id: 1,
      titulo: 'Guerrero Calavera',
      origen: 'Original',
      detalles: 'Una figura de 15cm con armadura de hueso y espada grande.',
      usuario: 'MakerPro99',
      estado: 'Pendiente'
    },
    {
      id: 2,
      titulo: 'Espada Maestra',
      origen: 'Zelda',
      detalles: 'Solo la empuñadura para un cosplay a escala real.',
      usuario: 'LinkFan',
      estado: 'Aprobada'
    },
    {
      id: 3,
      titulo: 'Cubo de Compañía',
      origen: 'Portal',
      detalles: 'Versión hueca para usar como maceta.',
      usuario: 'GLaDOS_Fan',
      estado: 'Rechazada'
    },
    {
      id: 4,
      titulo: 'Eva 01',
      origen: 'Evangelion',
      detalles: 'Busto detallado, escala 1/12.',
      usuario: 'Shinji_GetInTheRobot',
      estado: 'Pendiente'
    }
  ];

  // Método para cambiar el estado
  cambiarEstado(id: number, nuevoEstado: 'Aprobada' | 'Rechazada') {
    const item = this.sugerencias.find(s => s.id === id);
    if (item) {
      item.estado = nuevoEstado;
    }
  }
}