import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

interface Sugerencia {
  id: number;
  titulo: string;
  origen: string;
  detalles: string;
  usuario: string;

  estado: 'Pendiente' | 'Nueva' | 'Aprobada' | 'Rechazada';
}

@Component({
  selector: 'app-suggestion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suggestion.html',
  styleUrl: './suggestion.css'
})
export class SuggestionComponent implements OnInit {
  private api = inject(ApiService);

  sugerencias: Sugerencia[] = [];

  // al iniciar carga las sugerencias
  ngOnInit() {
    this.cargarSugerencias();
  }

  // obtiene las sugerencias desde la api
  cargarSugerencias() {
    this.api.getSugerencias().subscribe((data: any) => {
      this.sugerencias = data;
    });
  }

  // cambia el estado de una sugerencia
  cambiarEstado(id: number, nuevoEstado: string) {
    this.api.updateEstadoSugerencia(id, nuevoEstado).subscribe(() => {
      alert(`Sugerencia marcada como ${nuevoEstado}`);
      this.cargarSugerencias();
    });
  }
}
