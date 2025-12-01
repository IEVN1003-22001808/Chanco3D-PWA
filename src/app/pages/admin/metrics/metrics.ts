import { Component, OnInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../../../services/api.service'; // <--- Importamos servicio

Chart.register(...registerables);

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './metrics.html',
  styleUrl: './metrics.css'
})
export class MetricsComponent implements OnInit {
  private api = inject(ApiService); 

  @ViewChild('barCanvas') barCanvas!: ElementRef;
  @ViewChild('pieCanvas') pieCanvas!: ElementRef;

  isDragging = false;
  fileName: string | null = null;
  selectedFile: File | null = null; 
  
  showCharts = false;
  barChart: any;
  pieChart: any;

  ngOnInit() {
    this.cargarDatosGraficos();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.selectedFile = file;
    }
  }

  processData() {
    if (!this.selectedFile) {
      alert('Por favor selecciona un archivo CSV válido.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.api.uploadCsv(formData).subscribe({
      next: (res: any) => {
        if (res.exito) {
          alert('Datos procesados y actualizados en BD.');
          this.cargarDatosGraficos();
        } else {
          alert('Error: ' + res.mensaje);
        }
      },
      error: (e) => alert('Error de conexión al subir archivo.')
    });
  }

  cargarDatosGraficos() {
    this.api.getMetricas().subscribe({
      next: (res: any) => {
       
        if (res.ventas && res.ciudades) {
          this.showCharts = true;
          
          setTimeout(() => {
            this.renderBarChart(res.ventas.labels, res.ventas.data);
            this.renderPieChart(res.ciudades.labels, res.ciudades.data);
          }, 100);
        }
      },
      error: () => console.log('No hay datos de métricas aún.')
    });
  }

  
  
  renderBarChart(labels: string[], data: number[]) {
    if (this.barChart) this.barChart.destroy(); 

    const ctx = this.barCanvas.nativeElement.getContext('2d');
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Ventas por Producto',
          data: data,
          backgroundColor: '#4f46e5',
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: '#334155' }, ticks: { color: '#cbd5e1'} },
          x: { grid: { display: false }, ticks: { color: '#cbd5e1'} }
        }
      }
    });
  }

  renderPieChart(labels: string[], data: number[]) {
    if (this.pieChart) this.pieChart.destroy();

    const ctx = this.pieCanvas.nativeElement.getContext('2d');
    this.pieChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ['#4ade80', '#3b82f6', '#facc15', '#f87171', '#a78bfa'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: { 
          legend: { position: 'right', labels: { color: '#cbd5e1' } } 
        }
      }
    });
  }
}