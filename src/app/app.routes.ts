import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';
import { CatalogComponent } from './pages/shop/catalog/catalog';
import { CartComponent } from './pages/shop/cart/cart';
import { CustomQuoteComponent } from './pages/services-pages/custom-quote/custom-quote';
import { DashboardComponent } from './pages/admin/dashboard/dashboard';
import { InventoryComponent } from './pages/admin/inventory/inventory';
import { MetricsComponent } from './pages/admin/metrics/metrics';

export const routes: Routes = [
  // Redirigir raíz a Home
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  
  // Auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Tienda
  { path: 'catalog', component: CatalogComponent },
  { path: 'cart', component: CartComponent },
  
  // Servicios
  { path: 'quote', component: CustomQuoteComponent }, // Cotizador
  
  // Admin (Protegido en el futuro)
  { path: 'admin', component: DashboardComponent },
  { path: 'admin/inventory', component: InventoryComponent },

  { path: 'admin/metrics', component: MetricsComponent },
  
  // Error 404 (Cualquier otra cosa redirige a home por ahora)
  { path: '**', redirectTo: 'home' }
];