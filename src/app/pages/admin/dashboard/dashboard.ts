import { Component, AfterViewInit, OnInit, inject } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service'; // <--- Importamos servicio

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  private api = inject(ApiService); // <--- Inyectamos servicio

  filtroEstado: string = 'Todos';
  mostrarModal: boolean = false;
  ordenSeleccionada: any = null;

  // KPIs (Por ahora dejamos los simulados de tu amigo para que se vea bonito el header)
  kpiData = {
    ventas3Meses: 45200.00,
    clientesTotales: 128,
    clientesNuevosMes: 15,
    pedidosPendientes: 5
  };

  // Esta lista ahora se llenará desde la BD
  allOrders: any[] = [];

  ngOnInit() {
    this.cargarPedidosReales();
  }

  cargarPedidosReales() {
    this.api.getPedidos().subscribe({
      next: (data: any) => {
        this.allOrders = data;
        console.log('Pedidos cargados:', this.allOrders);
        // Opcional: Podrías recalcular kpiData.pedidosPendientes aquí contando los 'Pendiente'
      },
      error: (e) => console.error(e)
    });
  }

  // GETTER INTELIGENTE: Filtra y Ordena
  get filteredOrders() {
    let orders = this.allOrders;
    if (this.filtroEstado !== 'Todos') {
      orders = orders.filter(o => o.status === this.filtroEstado);
    }
    return orders.sort((a, b) => a.id - b.id);
  }

  // Cambiar Estado (Conectado a API)
  actualizarEstado(orden: any, nuevoEstado: string) {
    // 1. Actualizamos visualmente para que se sienta rápido
    orden.status = nuevoEstado;

    // 2. Mandamos el cambio a la BD
    this.api.updateEstadoPedido(orden.id, nuevoEstado).subscribe({
      next: () => console.log(`Orden #${orden.id} actualizada en BD`),
      error: () => alert('Error al actualizar estado en BD')
    });
  }

  // --- LÓGICA DEL MODAL DE DETALLES ---
  verDetalles(orden: any) {
    this.ordenSeleccionada = orden;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.ordenSeleccionada = null;
  }

  getClass(status: string): string {
    switch (status) {
      case 'Entregado': return 'exito';
      case 'Enviado': return 'azul';
      case 'En Producción': return 'advertencia';
      case 'Pendiente': return 'peligro';
      default: return '';
    }
  }

  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {
    const ctx = document.getElementById('ventasChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
          datasets: [{
            label: 'Ventas Totales ($)',
            data: [12000, 19000, 3000, 5000, 2000, 3000],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top', labels: { color: 'white' } },
            title: { display: true, text: 'Histórico de Ventas (Semestral)', color: 'white' }
          },
          scales: {
            y: { beginAtZero: true, ticks: { color: '#cbd5e1' }, grid: { color: '#334155' } },
            x: { ticks: { color: '#cbd5e1' }, grid: { color: '#334155' } }
          }
        }
      });
    }
  }
}
