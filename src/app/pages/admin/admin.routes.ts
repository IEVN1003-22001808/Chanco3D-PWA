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
      },
      {
        path: 'products',
        loadComponent: () => import('./products/products').then(m => m.ProductsComponent)
      },
      {
        path: 'gallery',
        loadComponent: () => import('./gallery/gallery').then(m => m.GalleryComponent)
      },
      {
        path: 'quotes',
        loadComponent: () => import('./quotes-history/quotes-history').then(m => m.QuotesHistoryComponent)
      },
    ]
  }
] as Routes;
