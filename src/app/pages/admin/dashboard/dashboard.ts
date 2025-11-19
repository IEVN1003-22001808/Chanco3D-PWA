import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  // Mock Data para la tabla de pedidos
  recentOrders = [
    { id: 1024, client: 'Alejandro M.', date: '18/11/2025', status: 'Pendiente', total: 450.00 },
    { id: 1023, client: 'Rogelio Y.', date: '17/11/2025', status: 'Enviado', total: 1200.00 },
    { id: 1022, client: 'Leonardo C.', date: '16/11/2025', status: 'Entregado', total: 890.50 },
    { id: 1021, client: 'George L.', date: '15/11/2025', status: 'Producción', total: 300.00 },
  ];
}