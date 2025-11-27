import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './metrics.html',
  styleUrl: './metrics.css'
})
export class MetricsComponent implements OnInit {
  
  @ViewChild('barCanvas') barCanvas!: ElementRef;
  @ViewChild('pieCanvas') pieCanvas!: ElementRef;

  isDragging = false;
  fileName: string | null = null;
  fileContent: string | null = null;
  showCharts = false;
  
  barChart: any;
  pieChart: any;

  ngOnInit() {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fileContent = e.target?.result as string;
      };
      reader.readAsText(file);
      
      // Reiniciar estado si suben nuevo archivo
      this.showCharts = false;
      if(this.barChart) this.barChart.destroy();
      if(this.pieChart) this.pieChart.destroy();
    }
  }

  processData() {
    if (!this.fileContent) {
      alert('Por favor selecciona un archivo CSV válido.');
      return;
    }

    setTimeout(() => {
      this.showCharts = true;
      setTimeout(() => this.createChartsFromCSV(this.fileContent!), 100);
      alert('¡Datos procesados correctamente!');
    }, 800);
  }

  createChartsFromCSV(csvData: string) {
    const labelsProductos = ['Hollow Knight', 'D&D Pack', 'Guardian', 'Pokemon', 'Soporte'];
    const dataVentas = [85, 45, 95, 60, 30];
    
    const labelsCiudades = ['León', 'CDMX', 'Guadalajara', 'Monterrey'];
    const dataCiudades = [45, 30, 15, 10];

    this.renderBarChart(labelsProductos, dataVentas);
    this.renderPieChart(labelsCiudades, dataCiudades);
  }

  renderBarChart(labels: string[], data: number[]) {
    const ctx = this.barCanvas.nativeElement.getContext('2d');
    
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Popularidad (Ventas)',
          data: data,
          backgroundColor: [
            'rgba(59, 130, 246, 0.7)', // Azul
            'rgba(59, 130, 246, 0.7)',
            'rgba(79, 70, 229, 0.9)', // Violeta (Resaltado)
            'rgba(59, 130, 246, 0.7)',
            'rgba(59, 130, 246, 0.7)'
          ],
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  renderPieChart(labels: string[], data: number[]) {
    const ctx = this.pieCanvas.nativeElement.getContext('2d');

    this.pieChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            '#4ade80', // Verde
            '#3b82f6', // Azul
            '#facc15', // Amarillo
            '#ef4444'  // Rojo
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { color: '#a1a1aa' } }
        }
      }
    });
  }
}