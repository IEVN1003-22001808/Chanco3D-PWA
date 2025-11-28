import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent {
  // Simulación de productos en el carrito (Mock Data)
  cartItems = [
    {
      id: 1,
      name: 'Figura Caballero Hueco (Hollow Knight)',
      type: 'Resina Estándar - Gris',
      price: 450.00,
      quantity: 1,
      image: '/HK.png'
    },
    {
      id: 2,
      name: 'Pack Miniaturas D&D (5 pzas)',
      type: 'Resina Alta Definición 8k (no incluye pintura)',
      price: 890.50,
      quantity: 2,
      image: '/D&D.png'
    }
  ];

  shippingCost = 150.00;

  // Calcular Subtotal
  getSubtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  // Calcular Total
  getTotal(): number {
    return this.getSubtotal() + this.shippingCost;
  }

  // Lógica simple para botones + y -
  increaseQty(item: any) {
    if (item.quantity < 10) item.quantity++;
  }

  decreaseQty(item: any) {
    if (item.quantity > 1) item.quantity--;
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }
}