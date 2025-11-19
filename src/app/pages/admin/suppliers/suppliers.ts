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

  addSupplier() {
    if (this.newSupplier.company) {
      const suppliesArray = this.newSupplier.supplies.split(',').map(s => s.trim());
      
      this.suppliers.push({
        id: this.suppliers.length + 1,
        company: this.newSupplier.company,
        contact: this.newSupplier.contact,
        email: this.newSupplier.email,
        phone: this.newSupplier.phone,
        supplies: suppliesArray
      });
      
      this.showForm = false;
      this.newSupplier = { company: '', contact: '', email: '', phone: '', supplies: '' };
    }
  }

  deleteSupplier(id: number) {
    if(confirm('¿Estás seguro de eliminar a este proveedor? Esta acción es irreversible.')) {
      this.suppliers = this.suppliers.filter(s => s.id !== id);
    }
  }
}