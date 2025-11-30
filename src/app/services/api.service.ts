import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Tu API en Flask
  private apiUrl = 'http://127.0.0.1:5000';

  // Inyección moderna (como en el PDF del profesor auth.ts)
  private http = inject(HttpClient);

  constructor() { }

  // ==========================================
  // MÓDULOS 1 y 3: AUTENTICACIÓN Y REGISTRO
  // ==========================================
  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credenciales);
  }

  registro(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, usuario);
  }

  // ==========================================
  // MÓDULO 2: CARRITO DE COMPRAS (Real)
  // ==========================================
  
  // 1. Agregar
  addAlCarrito(userId: any, productId: any): Observable<any> {
    const data = { usuario_id: userId, producto_id: productId, cantidad: 1 };
    return this.http.post(`${this.apiUrl}/carrito`, data);
  }

  // Ver lista
  getCarrito(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/carrito/${userId}`);
  }

  // Borrar item
  deleteItemCarrito(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/carrito/${id}`);
  }

  // Actualizar cantidad
  updateCantidadCarrito(cartId: number, cantidad: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/carrito/${cartId}`, { cantidad });
  }

  // Pagar
  realizarCheckout(userId: any, nombreCliente: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout/${userId}`, { cliente_nombre: nombreCliente });
  }
  
  // ==========================================
  // MÓDULO 2 y 12: CARRITO Y PEDIDOS
  // ==========================================
  // Crear un pedido nuevo (Checkout del carrito)
  crearPedido(pedido: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pedidos`, pedido);
  }

  // Obtener pedidos para el Dashboard (Admin)
  getPedidos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pedidos`);
  }

  // Actualizar estado de envío (Admin)
  updateEstadoPedido(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/pedidos/estado/${id}`, { status });
  }

  getAdminKPIs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/kpis`);
  }

  // ==========================================
  // MÓDULO 4: INVENTARIO (Admin)
  // ==========================================
  getInventario(): Observable<any> {
    return this.http.get(`${this.apiUrl}/inventario`);
  }

  addInsumo(insumo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/inventario`, insumo);
  }

  deleteInsumo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/inventario/${id}`);
  }
  updateStockInsumo(id: number, newStock: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/inventario/${id}`, { stock: newStock });
  }
  // ==========================================
  // MÓDULO 5: CATÁLOGO DE PRODUCTOS
  // ==========================================
  getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos`);
  }

  // Opcional: Si el admin agrega productos desde Angular
  addProducto(producto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/productos`, producto);
  }
  //Borrar producto del catálogo
  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/productos/${id}`);
  }
  updateProducto(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/productos/${id}`, producto);
  }

  // ==========================================
  // MÓDULO 6: MÉTRICAS (Admin)
  // ==========================================
  // Enviar el archivo CSV para procesar
  uploadCsv(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/metricas/upload`, formData);
  }

  getMetricas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/metricas/datos`);
  }

  // ==========================================
  // MÓDULO 7: GALERÍA DE LA COMUNIDAD
  // ==========================================
  getGaleria(): Observable<any> {
    return this.http.get(`${this.apiUrl}/galeria`);
  }

  postPublicacion(post: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/galeria`, post);
  }

  // Aprobar/Rechazar (Admin)
  updateEstadoGaleria(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/galeria/estado/${id}`, { status });
  }

  // ==========================================
  // MÓDULO 8: COTIZADOR
  // ==========================================
  
  guardarCotizacion(cotizacion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cotizaciones`, cotizacion);
  }
  getHistorialCotizaciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cotizaciones`);
  }

  // ==========================================
  // MÓDULO 9: PROVEEDORES (Admin)
  // ==========================================
  getProveedores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/proveedores`);
  }

  addProveedor(proveedor: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/proveedores`, proveedor);
  }

  deleteProveedor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/proveedores/${id}`);
  }

  updateProveedor(id: number, proveedor: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/proveedores/${id}`, proveedor);
  }

  // ==========================================
  // MÓDULO 10: CHATBOT KIDIK
  // ==========================================
  // Enviar pregunta y recibir respuesta
  chatKidik(mensaje: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/chatbot`, { question: mensaje });
  }

  // ==========================================
  // MÓDULO 11: BUZÓN DE SUGERENCIAS
  // ==========================================
  getSugerencias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sugerencias`);
  }

  postSugerencia(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sugerencias`, data);
  }

  updateEstadoSugerencia(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/sugerencias/estado/${id}`, { status });
  }
}
