import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-products-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent implements OnInit {
  private api = inject(ApiService);

  mostrarModal = false;
  // Para edición
  editingId: number | null = null;

  nuevoProducto = { name: '', category: 'Figuras', price: 0, description: '', image: '' };
  products: any[] = [];

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.api.getProductos().subscribe((res: any) => {
      if (res.exito) this.products = res.productos;
    });
  }

guardarProducto() {
  if (this.nuevoProducto.name && this.nuevoProducto.price > 0) {

    if (this.editingId) {
      // Edición de producto existente
      this.api.updateProducto(this.editingId, this.nuevoProducto).subscribe({
        next: () => {
          alert('Producto actualizado correctamente');
          this.cargarProductos();
          this.cerrarModal();
        },
        error: () => alert('Error al editar')
      });
    } else {
      // Creación de nuevo producto
      this.api.addProducto(this.nuevoProducto).subscribe({
        next: () => {
          alert('Producto publicado en la Tienda');
          this.cargarProductos();
          this.cerrarModal();
        },
        error: () => alert('Error al guardar')
      });
    }

  } else {
    alert('Nombre y precio obligatorios');
  }
}

  deleteProduct(id: number) {
    if(confirm('¿Borrar producto del catálogo?')) {
      // Llamamos al nuevo método deleteProducto
      this.api.deleteProducto(id).subscribe(() => {
         this.cargarProductos();
      });
    }
  }

  abrirModal() {
    this.editingId = null; // Se resetea edición
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevoProducto = { name: '', category: 'Figuras', price: 0, description: '', image: '' };
  }

editarProducto(p: any) {
  this.editingId = p.id; // Marcamos que estamos editando
  // Copiamos los datos al formulario
  this.nuevoProducto = {
    name: p.name,
    category: p.category,
    price: p.price,
    description: p.description,
    image: p.image
  };
  this.mostrarModal = true; // Aqui abre el modal
}
}
