import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class InventoryComponent implements OnInit {
  private api = inject(ApiService);

  mostrarModal = false;

  nuevoItem = { name: '', type: 'Resina', stock: 0, unit: 'ml', expiryDate: '', batch: '' };

  inventoryItems: any[] = [];

  // al iniciar cargamos la lista de insumos
  ngOnInit() {
    this.cargarInventario();
  }

  // obtenemos el inventario desde la api
  cargarInventario() {
    this.api.getInventario().subscribe((data: any) => {
      this.inventoryItems = data;
    });
  }

  // agregamos un nuevo insumo a la base de datos
  agregarItem() {

    if (this.nuevoItem.name && this.nuevoItem.stock >= 0) {

      this.api.addInsumo(this.nuevoItem).subscribe(() => {
        alert('Insumo registrado en BD');
        this.cargarInventario();
        this.cerrarModal();
      });

    } else {
      alert('Completa los campos obligatorios');
    }
  }

  // eliminamos un insumo del inventario
  eliminarItem(id: number) {
    if (confirm('¿Eliminar del inventario real?')) {
      this.api.deleteInsumo(id).subscribe(() => {
        this.cargarInventario();
      });
    }
  }

  abrirModal() { this.mostrarModal = true; }

  cerrarModal() {
    this.mostrarModal = false;

    this.nuevoItem = { name: '', type: 'Resina', stock: 0, unit: 'ml', expiryDate: '', batch: '' };
  }

  // verificamos si un insumo esta por caducar
  isNearExpiry(dateStr: string): boolean {
    const diff = new Date(dateStr).getTime() - new Date().getTime();
    const days = diff / (1000 * 3600 * 24);
    return days < 30 && days > 0;
  }
  isExpired(dateStr: string): boolean {
    return new Date(dateStr) < new Date();
  }
  getStatus(dateStr: string): string {
    if (this.isExpired(dateStr)) return 'CADUCADO';
    if (this.isNearExpiry(dateStr)) return 'Por Caducar';
    return 'Óptimo';
  }

  // actualiza la cantidad de stock de un insumo
  actualizarStock(item: any, cantidad: number) {
    const nuevoStock = Number(item.stock) + cantidad;

    if (nuevoStock < 0) {
      alert('El stock no puede ser negativo.');
      return;
    }


    this.api.updateStockInsumo(item.id, nuevoStock).subscribe({
      next: () => {

        item.stock = nuevoStock;
        console.log(`Stock actualizado a ${nuevoStock}`);
      },
      error: () => alert('Error al conectar con BD')
    });
  }
}
