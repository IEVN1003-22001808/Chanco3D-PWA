import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class CatalogComponent implements OnInit {
  private api = inject(ApiService);

  searchTerm: string = '';
  selectedCategory: string = 'Todos';

  products: any[] = [];

  // al iniciar cargamos los productos del catalogo
  ngOnInit() {
    this.cargarProductos();
  }

  // obtenemos los productos desde la api
  cargarProductos() {
    this.api.getProductos().subscribe({
      next: (res: any) => {
        if (res.exito) {
          this.products = res.productos;
        }
      },
      error: (e) => console.error('Error cargando catálogo', e)
    });
  }


  get filteredProducts() {
    return this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'Todos' || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  // agrega un producto al carrito de compras
  addToCart(product: any) {

    const userId = localStorage.getItem('userId');

    if (userId) {

      this.api.addAlCarrito(userId, product.id).subscribe({
        next: () => {
          alert(`¡${product.name} agregado al carrito!`);
        },
        error: (e) => alert('Error al agregar al carrito.')
      });
    } else {
      alert('Debes iniciar sesión para comprar.');
    }
  }
}
