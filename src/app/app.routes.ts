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
import { CommunityGalleryComponent } from './pages/services-pages/community-gallery/community-gallery';
import { SuggestionsBoxComponent } from './pages/services-pages/suggestions-box/suggestions-box';
import { ChatbotComponent } from './pages/services-pages/chatbot-kidik/chatbot-kidik';
import { SuppliersComponent } from './pages/admin/suppliers/suppliers';

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

  { path: 'community', component: CommunityGalleryComponent},

  { path: 'suggestions', component: SuggestionsBoxComponent },

  // RUTA PARA KIDIK
  { path: 'kidik', component: ChatbotComponent },
  
  // Admin (Protegido en el futuro)
  { path: 'admin', component: DashboardComponent },
  { path: 'admin/inventory', component: InventoryComponent },
  { path: 'admin/suppliers', component: SuppliersComponent },
  { path: 'admin/metrics', component: MetricsComponent },
  
  // Error 404 (Cualquier otra cosa redirige a home por ahora)
  { path: '**', redirectTo: 'home' }
];