import { Component, OnInit, inject } from '@angular/core'; // <--- Importar OnInit e inject
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service'; // <--- Importar ApiService

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class CatalogComponent implements OnInit {
  private api = inject(ApiService); // Inyectamos servicio

  searchTerm: string = '';
  selectedCategory: string = 'Todos';

  // Iniciamos vacío, se llena desde la BD
  products: any[] = [];

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.api.getProductos().subscribe({
      next: (res: any) => {
        if (res.exito) {
          this.products = res.productos; // Asignamos la lista real
        }
      },
      error: (e) => console.error('Error cargando catálogo', e)
    });
  }

  // Filtro dinámico (funciona igual sobre los datos reales)
  get filteredProducts() {
    return this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'Todos' || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  addToCart(product: any) {
    //criteruios 3 y 4
    const userId = localStorage.getItem('userId');
    
    if (userId) {
      
      this.api.addAlCarrito(userId, product.id).subscribe({
        next: () => {
          alert(`¡${product.name} agregado al carrito!`);
        },
        error: (e) => alert('Error al agregar al carrito.')
      });
    } else {
      // criterio 5 : Si NO tiene sesión, manda alerta modal
      alert('Debes iniciar sesión para comprar.');
    }
  }
}
