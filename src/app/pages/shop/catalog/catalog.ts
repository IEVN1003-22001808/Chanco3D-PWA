import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Necesario para el buscador

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class CatalogComponent {
  
  searchTerm: string = '';
  selectedCategory: string = 'Todos';

  // Base de datos falsa de productos
  products = [
    {
      id: 1,
      name: 'Caballero Hueco (Hollow Knight)',
      category: 'Figuras',
      price: 450.00,
      image: 'https://i.pinimg.com/564x/d3/26/33/d32633aa3086a7e0b4417ad993d5c4d7.jpg',
      isNew: true
    },
    {
      id: 2,
      name: 'Pack Miniaturas D&D (5 pzas)',
      category: 'Juegos de Mesa',
      price: 890.50,
      image: 'https://i.pinimg.com/736x/8e/89/47/8e8947af22df289622a4321f23093b3e.jpg',
      isNew: false
    },
    {
      id: 3,
      name: 'Soporte de Auriculares Cyberpunk',
      category: 'Accesorios',
      price: 650.00,
      image: 'https://i.pinimg.com/564x/2d/99/68/2d9968c522065a974139912853f73023.jpg',
      isNew: true
    },
    {
      id: 4,
      name: 'Busto Spider-Man 2099',
      category: 'Figuras',
      price: 1200.00,
      image: 'https://i.pinimg.com/564x/f9/ea/17/f9ea1725c7a7493d03143a7a9870c746.jpg',
      isNew: false
    },
    {
      id: 5,
      name: 'Engranajes Mecánicos (Prototipo)',
      category: 'Ingeniería',
      price: 300.00,
      image: 'https://i.pinimg.com/564x/0a/5c/5d/0a5c5d46e233524582281e8a0348a82b.jpg',
      isNew: false
    },
    {
      id: 6,
      name: 'Maceta Oddish Pokémon',
      category: 'Decoración',
      price: 250.00,
      image: 'https://i.pinimg.com/564x/e6/59/dd/e659dd89828380e61222244f217df746.jpg',
      isNew: true
    }
  ];

  // Filtro de los productos de manera dinámica
  get filteredProducts() {
    return this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'Todos' || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  // Simulación de agregar al carrito
  addToCart(product: any) {
    console.log('Producto agregado:', product.name);
    alert(`¡${product.name} agregado al carrito! 🛒`);
    // Aquí luego conectaremos con el servicio real del carrito
  }
}