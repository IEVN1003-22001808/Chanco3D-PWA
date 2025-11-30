import { Component, AfterViewInit, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit { // Quitamos AfterViewInit del implements por ahora, lo llamamos manual
  private api = inject(ApiService);

  filtroEstado: string = 'Todos';
  mostrarModal: boolean = false;
  ordenSeleccionada: any = null;
  chart: any; // Referencia al gráfico para destruirlo si recargamos

  // KPIs Reales (Inicializados en 0)
  kpiData = {
    ventasTotales: 0,
    clientesTotales: 0,
    clientesNuevosMes: 0,
    pedidosPendientes: 0
  };

  allOrders: any[] = [];

  ngOnInit() {
    this.cargarDatosDashboard();
  }

  cargarDatosDashboard() {
    // 1. Cargar Pedidos y Calcular KPIs de Ventas/Pendientes
    this.api.getPedidos().subscribe((data: any) => {
      this.allOrders = data;
      this.calcularKPIsPedidos();
      // Renderizamos el gráfico DESPUÉS de tener los datos
      setTimeout(() => this.renderChart3Meses(), 100); 
    });

    // 2. Cargar KPIs de Clientes (Desde BD)
    this.api.getAdminKPIs().subscribe((res: any) => {
      if (res.exito) {
        this.kpiData.clientesTotales = res.total_clients;
        this.kpiData.clientesNuevosMes = res.new_clients;
      }
    });
  }

  calcularKPIsPedidos() {
    // A. Ventas Totales (Suma de todo el historial o podrías filtrar por fecha)
    // Para HDU "Ingresos Totales", sumamos todo lo que no esté cancelado
    const ventas = this.allOrders
      .filter(o => o.status !== 'Cancelado')
      .reduce((acc, curr) => acc + curr.total, 0);
    this.kpiData.ventasTotales = ventas;

    // B. Pedidos Pendientes
    const pendientes = this.allOrders.filter(o => o.status === 'Pendiente').length;
    this.kpiData.pedidosPendientes = pendientes;
  }

  // --- GRÁFICO DE 3 MESES (Criterio 5) ---
  renderChart3Meses() {
    const ctx = document.getElementById('ventasChart') as HTMLCanvasElement;
    if (!ctx) return;
    if (this.chart) this.chart.destroy(); // Limpiar previo

    // 1. Preparar Etiquetas (Meses)
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const hoy = new Date();
    
    // Obtenemos los últimos 3 meses (ej: Sep, Oct, Nov)
    const labels = [];
    const dataVentas = [0, 0, 0]; // Acumuladores para Mes-2, Mes-1, Mes Actual

    for (let i = 2; i >= 0; i--) {
      const d = new Date();
      d.setMonth(hoy.getMonth() - i);
      labels.push(meses[d.getMonth()]);
    }

    // 2. Llenar Datos Reales
    // Recorremos pedidos y sumamos si caen en esos meses
    this.allOrders.forEach(orden => {
      const fechaOrden = new Date(orden.date); // Asegúrate que tu API devuelve 'YYYY-MM-DD'
      const mesOrden = fechaOrden.getMonth();
      const mesActual = hoy.getMonth();

      // Si es este mes (Posición 2 del array)
      if (mesOrden === mesActual) dataVentas[2] += orden.total;
      // Si es mes pasado (Posición 1)
      else if (mesOrden === (mesActual - 1)) dataVentas[1] += orden.total;
      // Si es antepasado (Posición 0)
      else if (mesOrden === (mesActual - 2)) dataVentas[0] += orden.total;
    });

    // 3. Pintar
    this.chart = new Chart(ctx, {
      type: 'bar', // Cambié a Barra porque se ve mejor para comparar 3 meses
      data: {
        labels: labels,
        datasets: [{
          label: 'Ventas ($)',
          data: dataVentas,
          backgroundColor: ['#4ade80', '#3b82f6', '#a78bfa'], // Colores distintos por mes
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }, // No hace falta leyenda para 3 barras
          title: { display: true, text: 'Ventas: Últimos 3 Meses', color: 'white' }
        },
        scales: {
          y: { beginAtZero: true, ticks: { color: '#cbd5e1' }, grid: { color: '#334155' } },
          x: { ticks: { color: '#cbd5e1' }, grid: { display: false } }
        }
      }
    });
  }

  // --- Resto de tu lógica (Filtrado, Modal, Estado) ---
  
  get filteredOrders() {
    let orders = this.allOrders;
    if (this.filtroEstado !== 'Todos') {
      orders = orders.filter(o => o.status === this.filtroEstado);
    }
    return orders.sort((a, b) => b.id - a.id); // Ordenamos DESC (Más nuevo arriba)
  }

  actualizarEstado(orden: any, nuevoEstado: string) {
    orden.status = nuevoEstado;
    this.api.updateEstadoPedido(orden.id, nuevoEstado).subscribe({
      next: () => {
        this.calcularKPIsPedidos(); // Recalcular KPI al cambiar estado
        console.log('Estado actualizado');
      }
    });
  }

  verDetalles(orden: any) { this.ordenSeleccionada = orden; this.mostrarModal = true; }
  cerrarModal() { this.mostrarModal = false; this.ordenSeleccionada = null; }

  getClass(status: string): string {
    switch (status) {
      case 'Entregado': return 'exito';
      case 'Enviado': return 'azul';
      case 'En Producción': return 'advertencia';
      case 'Pendiente': return 'peligro';
      default: return '';
    }
  }
}