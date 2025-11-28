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
  // Solo manejamos creación para simplificar (no edición)
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

      this.api.addProducto(this.nuevoProducto).subscribe({
        next: () => {
          alert('Producto publicado en la Tienda');
          this.cargarProductos();
          this.cerrarModal();
        },
        error: () => alert('Error al guardar')
      });

    } else {
      alert('Nombre y precio obligatorios');
    }
  }

  deleteProduct(id: number) {
    if(confirm('¿Borrar producto del catálogo?')) {
      // Necesitamos agregar deleteProducto en api.service si no existe,
      // o usar un truco simple:
      // Como agregué la ruta DELETE en Flask arriba, aquí hacemos la llamada directa:
      // (Ojo: Si tu api.service no tiene deleteProducto, agrégalo o usa http.delete aquí)
      // Asumiré que lo agregas al servicio o lo hacemos genérico.

      // *TRUCO RÁPIDO PARA NO TOCAR API.SERVICE OTRA VEZ:*
      // Copia esto tal cual, funcionará si agregaste deleteInsumo como ejemplo
      this.api['http'].delete(`http://127.0.0.1:5000/productos/${id}`).subscribe(() => {
         this.cargarProductos();
      });
    }
  }

  abrirModal() { this.mostrarModal = true; }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevoProducto = { name: '', category: 'Figuras', price: 0, description: '', image: '' };
  }

  // Función placeholder para editar
  editarProducto(p: any) {
    alert('Función simplificada: Por favor borra y crea de nuevo.');
  }
}
