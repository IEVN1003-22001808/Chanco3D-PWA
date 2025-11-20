import { Routes } from '@angular/router';

export default[
  {
    path: 'catalog',
    loadComponent: () => import('./catalog/catalog').then(m => m.CatalogComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart').then(m => m.CartComponent)
  },

]as Routes;
