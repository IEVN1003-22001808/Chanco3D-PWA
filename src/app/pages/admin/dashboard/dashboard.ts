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
export class DashboardComponent implements OnInit {
  private api = inject(ApiService);

  filtroEstado: string = 'Todos';
  mostrarModal: boolean = false;
  ordenSeleccionada: any = null;
  chart: any;

  kpiData = {
    ventasTotales: 0,
    clientesTotales: 0,
    clientesNuevosMes: 0,
    pedidosPendientes: 0
  };

  allOrders: any[] = [];

  // esta funcion se ejecuta al iniciar el componente
  ngOnInit() {
    this.cargarDatosDashboard();
  }

  // aqui cargamos los datos del dashboard desde la api
  cargarDatosDashboard() {

    this.api.getPedidos().subscribe((data: any) => {
      this.allOrders = data;
      this.calcularKPIsPedidos();

      setTimeout(() => this.renderChart3Meses(), 100);
    });


    this.api.getAdminKPIs().subscribe((res: any) => {
      if (res.exito) {
        this.kpiData.clientesTotales = res.total_clients;
        this.kpiData.clientesNuevosMes = res.new_clients;
      }
    });
  }

  // calcula los totales de ventas y pedidos pendientes
  calcularKPIsPedidos() {

    const ventas = this.allOrders
      .filter(o => o.status !== 'Cancelado')
      .reduce((acc, curr) => acc + curr.total, 0);
    this.kpiData.ventasTotales = ventas;


    const pendientes = this.allOrders.filter(o => o.status === 'Pendiente').length;
    this.kpiData.pedidosPendientes = pendientes;
  }


  // genera la grafica de ventas de los ultimos 3 meses
  renderChart3Meses() {
    const ctx = document.getElementById('ventasChart') as HTMLCanvasElement;
    if (!ctx) return;
    if (this.chart) this.chart.destroy();


    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const hoy = new Date();


    const labels = [];
    const dataVentas = [0, 0, 0];

    for (let i = 2; i >= 0; i--) {
      const d = new Date();
      d.setMonth(hoy.getMonth() - i);
      labels.push(meses[d.getMonth()]);
    }


    this.allOrders.forEach(orden => {
      const fechaOrden = new Date(orden.date);
      const mesOrden = fechaOrden.getMonth();
      const mesActual = hoy.getMonth();


      if (mesOrden === mesActual) dataVentas[2] += orden.total;

      else if (mesOrden === (mesActual - 1)) dataVentas[1] += orden.total;

      else if (mesOrden === (mesActual - 2)) dataVentas[0] += orden.total;
    });


    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Ventas ($)',
          data: dataVentas,
          backgroundColor: ['#4ade80', '#3b82f6', '#a78bfa'],
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Ventas: Últimos 3 Meses', color: 'white' }
        },
        scales: {
          y: { beginAtZero: true, ticks: { color: '#cbd5e1' }, grid: { color: '#334155' } },
          x: { ticks: { color: '#cbd5e1' }, grid: { display: false } }
        }
      }
    });
  }


  // filtra los pedidos segun el estado seleccionado
  get filteredOrders() {
    let orders = this.allOrders;
    if (this.filtroEstado !== 'Todos') {
      orders = orders.filter(o => o.status === this.filtroEstado);
    }
    return orders.sort((a, b) => b.id - a.id);
  }

  // actualiza el estado de un pedido en la base de datos
  actualizarEstado(orden: any, nuevoEstado: string) {
    orden.status = nuevoEstado;
    this.api.updateEstadoPedido(orden.id, nuevoEstado).subscribe({
      next: () => {
        this.calcularKPIsPedidos();
        console.log('Estado actualizado');
      }
    });
  }

  // muestra los detalles de un pedido especifico
  verDetalles(orden: any) { this.ordenSeleccionada = orden; this.mostrarModal = true; }
  cerrarModal() { this.mostrarModal = false; this.ordenSeleccionada = null; }

  // obtiene la clase css segun el estado del pedido
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