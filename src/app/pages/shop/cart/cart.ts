import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);

  cartItems: any[] = [];
  shippingCost = 150.00;
  userId: any = null;

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.cargarCarrito();
    }
  }

  cargarCarrito() {
    this.api.getCarrito(this.userId).subscribe({
      next: (data: any) => {
        this.cartItems = data;
      },
      error: (e) => console.error(e)
    });
  }


  removeItem(item: any) {
    if(confirm('¿Quitar del carrito?')) {
      this.api.deleteItemCarrito(item.cart_id).subscribe(() => {
        this.cargarCarrito(); 
      });
    }
  }

  increaseQty(item: any) {
    if (item.quantity < 10) { 
      const nuevaCant = item.quantity + 1;
      this.actualizarBD(item, nuevaCant);
    } else {
      alert('Máximo 10 unidades por producto.');
    }
  }

  decreaseQty(item: any) {
    if (item.quantity > 1) { 
      const nuevaCant = item.quantity - 1;
      this.actualizarBD(item, nuevaCant);
    }
  }


  actualizarBD(item: any, cantidad: number) {
    item.quantity = cantidad; 
    
    this.api.updateCantidadCarrito(item.cart_id, cantidad).subscribe({
      error: () => {
        alert('Error al guardar cantidad');
        this.cargarCarrito(); 
      }
    });
  }

  procederAlPago() {
    if (this.cartItems.length === 0) return;
    const nombre = localStorage.getItem('userName') || 'Cliente Web';

    this.api.realizarCheckout(this.userId, nombre).subscribe({
      next: (res: any) => {
        if (res.exito) {
          alert('¡Compra realizada!');
          this.cargarCarrito();
          this.router.navigate(['/home']);
        }
      }
    });
  }

  getSubtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  getTotal(): number {
    return this.getSubtotal() + this.shippingCost;
  }
}