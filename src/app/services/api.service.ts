import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://127.0.0.1:5000';

  private http = inject(HttpClient);

  constructor() { }

  //login y registro

  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credenciales);
  }

  registro(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, usuario);
  }


  //Carrito
  
  // Agregar
  addAlCarrito(userId: any, productId: any): Observable<any> {
    const data = { usuario_id: userId, producto_id: productId, cantidad: 1 };
    return this.http.post(`${this.apiUrl}/carrito`, data);
  }

  //Ver lista
  getCarrito(userId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/carrito/${userId}`);
  }

  //Borrar 
  deleteItemCarrito(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/carrito/${id}`);
  }

  //Actualizar cantidad
  updateCantidadCarrito(cartId: number, cantidad: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/carrito/${cartId}`, { cantidad });
  }

  // Pagar
  realizarCheckout(userId: any, nombreCliente: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout/${userId}`, { cliente_nombre: nombreCliente });
  }
  

  // Crear un pedido nuevo 
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


  //inventario
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
  //productos

  getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos`);
  }

  addProducto(producto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/productos`, producto);
  }

  //Borrar producto del catalogo
  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/productos/${id}`);
  }
  updateProducto(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/productos/${id}`, producto);
  }

//metricas
  uploadCsv(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/metricas/upload`, formData);
  }

  getMetricas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/metricas/datos`);
  }


  //galeria
  getGaleria(): Observable<any> {
    return this.http.get(`${this.apiUrl}/galeria`);
  }

  postPublicacion(post: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/galeria`, post);
  }

  // Aprobar/Rechazar 
  updateEstadoGaleria(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/galeria/estado/${id}`, { status });
  }



  //cotizaciones
  guardarCotizacion(cotizacion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cotizaciones`, cotizacion);
  }
  getHistorialCotizaciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cotizaciones`);
  }

//proveedores
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


  //chatbot
  chatKidik(mensaje: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/chatbot`, { question: mensaje });
  }

//buzon de sugerencias
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
