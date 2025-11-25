import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.HomeComponent)
  },

  // Rutas: /auth/login, /auth/register
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then(m => m.default)
  },

  // Rutas: /shop/catalog, /shop/cart
  {
    path: 'shop',
    loadChildren: () =>
      import('./pages/shop/shop.routes').then(m => m.default)
  },

  // Rutas: /admin, /admin/inventory, /admin/metrics
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.routes').then(m => m.default)
  },

  // Rutas: /services/quote, /services/community, service/suggestions
  {
    path: 'services',
    loadChildren: () =>
      import('./pages/services-pages/services.routes').then(m => m.default)
  },


];
