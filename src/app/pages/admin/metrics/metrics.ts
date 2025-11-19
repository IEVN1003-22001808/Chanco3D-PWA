import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './metrics.html',
  styleUrl: './metrics.css'
})
export class MetricsComponent {
  isDragging = false;
  fileName: string | null = null;
  showCharts = false; // Controla si se ven los gráficos

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.showCharts = false; // Reiniciar si sube otro
    }
  }

  processData() {
    if (!this.fileName) return;
    
    // Simulamos un tiempo de carga de 1 segundo
    setTimeout(() => {
      this.showCharts = true;
      alert('¡Datos procesados correctamente! 📊');
    }, 800);
  }
}