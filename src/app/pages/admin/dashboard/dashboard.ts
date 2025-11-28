import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {

  filtroEstado: string = 'Todos';
  mostrarModal: boolean = false;
  ordenSeleccionada: any = null;

  // KPIs Simulados
  kpiData = {
    ventas3Meses: 45200.00,
    clientesTotales: 128,
    clientesNuevosMes: 15,
    pedidosPendientes: 5
  };

  // Base de datos de Pedidos
  allOrders = [
    {
      id: 1001, client: 'Maria S.', date: '2025-10-01', status: 'Entregado', total: 1500.00,
      products: [
        { name: 'Busto Spider-Man 2099', qty: 1, price: 1200 },
        { name: 'Maceta Oddish', qty: 1, price: 300 }
      ]
    },
    {
      id: 1002, client: 'Juan P.', date: '2025-10-05', status: 'Entregado', total: 450.00,
      products: [
        { name: 'Caballero Hueco', qty: 1, price: 450 }
      ]
    },
    {
      id: 1003, client: 'George L.', date: '2025-11-15', status: 'En Producción', total: 300.00,
      products: [
        { name: 'Engranajes (Prototipo)', qty: 1, price: 300 }
      ]
    },
    {
      id: 1004, client: 'Leonardo C.', date: '2025-11-16', status: 'Enviado', total: 890.50,
      products: [
        { name: 'Pack Miniaturas D&D', qty: 1, price: 890.50 }
      ]
    },
    {
      id: 1005, client: 'Rogelio Y.', date: '2025-11-17', status: 'Pendiente', total: 1200.00,
      products: [
        { name: 'Busto Spider-Man 2099', qty: 1, price: 1200 }
      ]
    },
    {
      id: 1006, client: 'Alejandro M.', date: '2025-11-18', status: 'Pendiente', total: 450.00,
      products: [
        { name: 'Caballero Hueco', qty: 1, price: 450 }
      ]
    },
  ];

  // GETTER INTELIGENTE: Filtra y Ordena
  get filteredOrders() {
    let orders = this.allOrders;
    if (this.filtroEstado !== 'Todos') {
      orders = orders.filter(o => o.status === this.filtroEstado);
    }
    return orders.sort((a, b) => a.id - b.id);
  }

  // Cambiar Estado
  actualizarEstado(orden: any, nuevoEstado: string) {
    orden.status = nuevoEstado;
    console.log(`Orden #${orden.id} cambiada a: ${nuevoEstado}`);
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
}