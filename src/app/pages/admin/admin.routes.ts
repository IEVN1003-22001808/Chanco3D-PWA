import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

export default [
  {
    path: '',
    component: Layout, 
    children: [ 
      {
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full' 
      },
      {
        path: 'dashboard',
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
      },
       {
        path: 'suggestion',
        loadComponent: () => import('./suggestion/suggestion').then(m => m.SuggestionComponent)
      }
    ]
  }
] as Routes;