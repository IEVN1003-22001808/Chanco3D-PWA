import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './suppliers.html',
  styleUrl: './suppliers.css'
})
export class SuppliersComponent {
  showForm = false;
  editingId: number | null = null;
  
  newSupplier = { company: '', contact: '', email: '', phone: '', supplies: '' };

  // Mock Data (Basado en PDF)
  suppliers = [
    { 
      id: 1, 
      company: 'Caballero 3D', 
      contact: 'Juan Pérez', 
      email: 'ventas@caballero3d.com', 
      phone: '+52 477 756 9238', 
      supplies: ['Resina Gris', 'Resina 8K'] 
    },
    { 
      id: 2, 
      company: '3D Factory MX', 
      contact: 'Ana López', 
      email: 'ana@factorymx.com', 
      phone: '+52 477 833 5687', 
      supplies: ['Alcohol Isopropílico', 'Filtros'] 
    },
    { 
      id: 3, 
      company: 'TecnoMAX', 
      contact: 'Carlos Ruiz', 
      email: 'carlos@tecnomax.com', 
      phone: '+52 477 567 4575', 
      supplies: ['Guantes Nitrilo', 'Espátulas'] 
    }
  ];

  openForm() {
    this.editingId = null;
    this.newSupplier = { company: '', contact: '', email: '', phone: '', supplies: '' };
    this.showForm = true;
  }

  editSupplier(supplier: any) {
    this.editingId = supplier.id;
    this.newSupplier = { 
      ...supplier, 
      supplies: supplier.supplies.join(', ') 
    };
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.editingId = null;
  }

  // Guardar (Crear o Actualizar)
  saveSupplier() {
    if (this.newSupplier.company) {
      const suppliesArray = this.newSupplier.supplies.split(',').map(s => s.trim());
      
      if (this.editingId) {
        // --- MODO EDICIÓN ---
        const index = this.suppliers.findIndex(s => s.id === this.editingId);
        if (index !== -1) {
          this.suppliers[index] = {
            id: this.editingId,
            company: this.newSupplier.company,
            contact: this.newSupplier.contact,
            email: this.newSupplier.email,
            phone: this.newSupplier.phone,
            supplies: suppliesArray
          };
          alert('Proveedor actualizado correctamente.');
        }
      } else {
        // --- MODO CREACIÓN ---
        this.suppliers.push({
          id: Date.now(),
          company: this.newSupplier.company,
          contact: this.newSupplier.contact,
          email: this.newSupplier.email,
          phone: this.newSupplier.phone,
          supplies: suppliesArray
        });
        alert('Proveedor registrado correctamente.');
      }
      
      this.closeForm();
    } else {
      alert('El nombre de la empresa es obligatorio.');
    }
  }

  deleteSupplier(id: number) {
    if(confirm('¿Estás seguro de eliminar a este proveedor? Esta acción es irreversible.')) {
      this.suppliers = this.suppliers.filter(s => s.id !== id);
    }
  }
}