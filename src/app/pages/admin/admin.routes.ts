import { Routes } from '@angular/router';

export default [
  {
    path: '', // Dashboard principal
    loadComponent: () => import('./dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: 'inventory',
    loadComponent: () => import('./inventory/inventory').then(m => m.InventoryComponent)
  },
  {
    path: 'metrics',
    loadComponent: () => import('./metrics/metrics').then(m => m.MetricsComponent)
  },
  {
    path: 'suppliers',
    loadComponent: () => import('./suppliers/suppliers').then(m => m.SuppliersComponent)
  }
] as Routes;
