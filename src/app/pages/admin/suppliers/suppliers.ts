import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './suppliers.html',
  styleUrl: './suppliers.css'
})
export class SuppliersComponent implements OnInit {
  private api = inject(ApiService);

  mostrarModal = false; // Controla el modal
  editingId: number | null = null;
  
  suppliers: any[] = [];
  
  // Modelo vacío base
  newSupplier = { company: '', contact: '', email: '', phone: '', supplies: '' };

  ngOnInit() {
    this.cargarProveedores();
  }

  cargarProveedores() {
    this.api.getProveedores().subscribe((data: any) => {
      this.suppliers = data;
    });
  }

  // --- LÓGICA DEL MODAL ---

  // 1. Abrir para CREAR (Limpia todo)
  abrirModal() {
    this.editingId = null; // Importante: Decimos "No estamos editando"
    this.newSupplier = { company: '', contact: '', email: '', phone: '', supplies: '' }; // Limpiamos campos
    this.mostrarModal = true;
  }

  // 2. Abrir para EDITAR (Carga datos)
  editarProveedor(s: any) {
    this.editingId = s.id; // Guardamos a quién editamos
    // Copiamos los datos para no editar la tabla en tiempo real
    this.newSupplier = {
      company: s.company,
      contact: s.contact,
      email: s.email,
      phone: s.phone,
      supplies: s.supplies.join(', ') // Convertimos array a texto para el input
    };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    // Limpieza de seguridad al cerrar
    this.editingId = null;
    this.newSupplier = { company: '', contact: '', email: '', phone: '', supplies: '' };
  }

  guardarProveedor() {
    if (!this.newSupplier.company) {
      alert('El nombre de la empresa es obligatorio.');
      return;
    }

    if (this.editingId) {
      // --- MODO EDICIÓN ---
      this.api.updateProveedor(this.editingId, this.newSupplier).subscribe({
        next: () => {
          alert('Proveedor actualizado correctamente');
          this.cargarProveedores();
          this.cerrarModal();
        },
        error: () => alert('Error al actualizar')
      });
    } else {
      // --- MODO CREACIÓN ---
      this.api.addProveedor(this.newSupplier).subscribe({
        next: () => {
          alert('Proveedor registrado exitosamente');
          this.cargarProveedores();
          this.cerrarModal();
        },
        error: () => alert('Error al guardar')
      });
    }
  }

  deleteSupplier(id: number) {
    if(confirm('¿Estás seguro de eliminar este proveedor?')) {
      this.api.deleteProveedor(id).subscribe(() => {
        this.cargarProveedores();
      });
    }
  }
}