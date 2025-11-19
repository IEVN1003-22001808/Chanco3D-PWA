import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class InventoryComponent {
  // Mock Data basado en el documento [cite: 235]
  inventoryItems = [
    { id: 1, name: 'Resina Gris Estándar', batch: 'A-101', type: 'Resina', stock: 3500, unit: 'ml', expiryDate: '2025-12-01' }, // Bien
    { id: 2, name: 'Alcohol Isopropílico', batch: 'B-202', type: 'Limpieza', stock: 500, unit: 'ml', expiryDate: '2024-11-25' }, // Por caducar
    { id: 3, name: 'Guantes Nitrilo', batch: 'C-303', type: 'EPP', stock: 50, unit: 'pzas', expiryDate: '2026-01-15' }, // Bien
    { id: 4, name: 'Resina 8K', batch: 'A-105', type: 'Resina', stock: 1000, unit: 'ml', expiryDate: '2023-10-10' }, // Caducado
  ];

  // Helpers de Fecha
  isNearExpiry(dateStr: string): boolean {
    const today = new Date();
    const expiry = new Date(dateStr);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    return diffDays < 30 && diffDays > 0; // Menos de 30 días [cite: 238]
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