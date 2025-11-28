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

  showForm = false;
  suppliers: any[] = []; // Inicia vacío para llenarse con la BD

  // Objeto temporal para formulario
  newSupplier = { company: '', contact: '', email: '', phone: '', supplies: '' };

  // Al iniciar el componente, cargamos los datos
  ngOnInit() {
    this.cargarProveedores();
  }

  // Función para pedir datos a Flask
  cargarProveedores() {
    this.api.getProveedores().subscribe({
      next: (data: any) => {
        this.suppliers = data; // Guardamos los datos reales
        console.log('Proveedores cargados:', data);
      },
      error: (err) => console.error('Error al conectar:', err)
    });
  }

  // --- TUS FUNCIONES ORIGINALES (Adaptadas a BD) ---

  openForm() {
    this.newSupplier = { company: '', contact: '', email: '', phone: '', supplies: '' };
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  saveSupplier() {
    // Validamos que tenga nombre
    if (!this.newSupplier.company) {
        alert('El nombre de la empresa es obligatorio.');
        return;
    }

    // Enviamos a la API (Flask se encarga de guardar)
    this.api.addProveedor(this.newSupplier).subscribe({
      next: (res: any) => {
        alert('Proveedor guardado exitosamente.');
        this.cargarProveedores(); // Recargamos la tabla para ver el cambio
        this.closeForm();
      },
      error: (e) => alert('Error al guardar en BD: ' + e.message)
    });
  }

  deleteSupplier(id: number) {
    if(confirm('¿Estás seguro de eliminar este proveedor de la Base de Datos?')) {
      this.api.deleteProveedor(id).subscribe({
        next: (res: any) => {
          this.cargarProveedores(); // Recargamos la tabla
        },
        error: (e) => alert('Error al eliminar')
      });
    }
  }

  // Función placeholder para editar (Por ahora solo visual o lógica simple)
  editSupplier(supplier: any) {
      alert("Para editar, implementaremos el PUT más adelante. Por ahora borra y crea de nuevo.");
  }
}
