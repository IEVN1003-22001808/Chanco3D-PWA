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
      image: '/HK.png',
      isNew: true
    },
    {
      id: 2,
      name: 'Pack Miniaturas D&D (5 pzas)',
      category: 'Juegos de Mesa',
      price: 890.50,
      image: '/D&D.png',
      isNew: false
    },
    {
      id: 3,
      name: 'Soporte de Auriculares Cyberpunk',
      category: 'Accesorios',
      price: 650.00,
      image: '/SA.png',
      isNew: true
    },
    {
      id: 4,
      name: 'Busto Spider-Man 2099',
      category: 'Figuras',
      price: 1200.00,
      image: '/SM2099.webp',
      isNew: false
    },
    {
      id: 5,
      name: 'GT-R NISMO (PROTOTIPO)',
      category: 'Ingeniería',
      price: 450.00,
      image: 'https://i.postimg.cc/DmVJQwY7/GT-R.png',
      isNew: false
    },
    {
      id: 6,
      name: 'Maceta Oddish Pokémon',
      category: 'Decoración',
      price: 250.00,
      image: '/MO.png',
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
    alert(`¡${product.name} agregado al carrito!`);
    // Aquí luego conectaremos con el servicio real del carrito
  }
}