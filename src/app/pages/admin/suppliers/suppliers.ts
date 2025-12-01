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

  mostrarModal = false;
  editingId: number | null = null;

  suppliers: any[] = [];
  newSupplier = { company: '', contact: '', email: '', phone: '', supplies: '' };

  // al iniciar carga la lista de proveedores
  ngOnInit() {
    this.cargarProveedores();
  }

  // obtiene los proveedores desde la api
  cargarProveedores() {
    this.api.getProveedores().subscribe((data: any) => {
      this.suppliers = data;
    });
  }


  abrirModal() {
    this.editingId = null;
    this.newSupplier = { company: '', contact: '', email: '', phone: '', supplies: '' }; 
    this.mostrarModal = true;
  }


  // preparamos el formulario para editar un proveedor
  editarProveedor(s: any) {
    this.editingId = s.id;

    this.newSupplier = {
      company: s.company,
      contact: s.contact,
      email: s.email,
      phone: s.phone,
      supplies: s.supplies.join(', ')
    };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.editingId = null;
    this.newSupplier = { company: '', contact: '', email: '', phone: '', supplies: '' };
  }

  // guarda un nuevo proveedor o actualiza uno existente
  guardarProveedor() {
    if (!this.newSupplier.company) {
      alert('El nombre de la empresa es obligatorio.');
      return;
    }

    if (this.editingId) {
      this.api.updateProveedor(this.editingId, this.newSupplier).subscribe({
        next: () => {
          alert('Proveedor actualizado correctamente');
          this.cargarProveedores();
          this.cerrarModal();
        },
        error: () => alert('Error al actualizar')
      });
    } else {
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

  // elimina un proveedor de la base de datos
  deleteSupplier(id: number) {
    if (confirm('¿Estás seguro de eliminar este proveedor?')) {
      this.api.deleteProveedor(id).subscribe(() => {
        this.cargarProveedores();
      });
    }
  }
}