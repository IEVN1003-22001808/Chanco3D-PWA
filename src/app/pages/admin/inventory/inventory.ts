import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class InventoryComponent implements OnInit {
  
  mostrarModal = false;

  // Objeto temporal para el nuevo insumo
  nuevoItem = {
    name: '',
    type: 'Resina',
    stock: 0,
    unit: 'ml',
    expiryDate: '',
    batch: ''
  };

  // Mock Data inicial
  inventoryItems = [
    { id: 1, name: 'Resina Gris Estándar', batch: 'A-101', type: 'Resina', stock: 3500, unit: 'ml', expiryDate: '2025-12-01' },
    { id: 2, name: 'Alcohol Isopropílico', batch: 'B-202', type: 'Limpieza', stock: 500, unit: 'ml', expiryDate: '2024-11-25' },
    { id: 3, name: 'Guantes Nitrilo', batch: 'C-303', type: 'EPP', stock: 50, unit: 'pzas', expiryDate: '2026-01-15' },
    { id: 4, name: 'Resina 8K', batch: 'A-105', type: 'Resina', stock: 1000, unit: 'ml', expiryDate: '2023-10-10' },
  ];

  ngOnInit() {
    this.ordenarItems(); 
  }

  // Ordenar por Caducidad (Antiguo a Nuevo)
  ordenarItems() {
    this.inventoryItems.sort((a, b) => {
      return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
    });
  }

  // Acciones + y -
  actualizarStock(item: any, cantidad: number) {
    const nuevoStock = item.stock + cantidad;
    if (nuevoStock < 0) return; 
    item.stock = nuevoStock;
  }

  // Acción Borrar
  eliminarItem(id: number) {
    if(confirm('¿Estás seguro de eliminar este insumo?')) {
      this.inventoryItems = this.inventoryItems.filter(i => i.id !== id);
    }
  }

  // Agregar Insumo
  agregarItem() {
    if (this.nuevoItem.name && this.nuevoItem.stock >= 0 && this.nuevoItem.expiryDate) {
      this.inventoryItems.push({
        id: Date.now(),
        name: this.nuevoItem.name,
        batch: this.nuevoItem.batch || 'N/A',
        type: this.nuevoItem.type,
        stock: this.nuevoItem.stock,
        unit: this.nuevoItem.unit,
        expiryDate: this.nuevoItem.expiryDate
      });
      
      this.ordenarItems(); 
      this.cerrarModal();
      alert('Insumo registrado correctamente.');
    } else {
      alert('Por favor completa los campos obligatorios.');
    }
  }

  abrirModal() { this.mostrarModal = true; }
  
  cerrarModal() { 
    this.mostrarModal = false; 
    this.nuevoItem = { name: '', type: 'Resina', stock: 0, unit: 'ml', expiryDate: '', batch: '' };
  }

  // Helpers de Fecha
  isNearExpiry(dateStr: string): boolean {
    const today = new Date();
    const expiry = new Date(dateStr);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    return diffDays < 30 && diffDays > 0; 
  }

  isExpired(dateStr: string): boolean {
    const today = new Date();
    const expiry = new Date(dateStr);
    return expiry < today;
  }

  getStatus(dateStr: string): string {
    if (this.isExpired(dateStr)) return 'CADUCADO';
    if (this.isNearExpiry(dateStr)) return 'Por Caducar';
    return 'Óptimo';
  }
}