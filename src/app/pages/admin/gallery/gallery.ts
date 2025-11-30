import { Component, OnInit, AfterViewChecked, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ApiService } from '../../../services/api.service'; // <--- Importamos servicio

declare var instgrm: any;

@Component({
  selector: 'app-gallery-moderation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class GalleryComponent implements OnInit, AfterViewChecked {
  private api = inject(ApiService);
  private sanitizer = inject(DomSanitizer);

  postSeleccionado: any = null;
  posts: any[] = []; // Se llena desde BD

  ngOnInit() {
    this.cargarGaleria();
  }

  cargarGaleria() {
    this.api.getGaleria().subscribe({
      next: (data: any) => {
        this.posts = data;
        // Reiniciamos Instagram por si acaso
        setTimeout(() => {
          if (typeof instgrm !== 'undefined') instgrm.Embeds.process();
        }, 1000);
      },
      error: (e) => console.error(e)
    });
  }

  // Lógica para Aprobar
  aprobarPost(id: number) {
    this.api.updateEstadoGaleria(id, 'Aprobada').subscribe({
      next: () => {
        alert('Publicación Aprobada');
        this.cargarGaleria(); // Recargar lista
      },
      error: () => alert('Error al actualizar')
    });
  }

  // Lógica para Rechazar
  rechazarPost(id: number) {
    if(confirm('¿Rechazar esta publicación?')) {
      this.api.updateEstadoGaleria(id, 'Rechazada').subscribe({
        next: () => {
          this.cargarGaleria();
        },
        error: () => alert('Error al actualizar')
      });
    }
  }

  // --- Lógica Visual (Modal y Embeds) ---

  verPost(post: any) {
    // Generamos el HTML seguro solo al abrir el modal
    this.postSeleccionado = {
      ...post,
      safeHtml: this.getInstagramEmbed(post.image)
    };

    // Forzamos un pequeño delay para que Angular pinte el modal antes de que Instagram procese
    setTimeout(() => {
      if (typeof instgrm !== 'undefined') instgrm.Embeds.process();
    }, 100);
  }

  cerrarModal(event: any) {
    // Si el clic fue en el fondo (overlay) o botón cerrar
    this.postSeleccionado = null;
  }

  getInstagramEmbed(url: string): SafeHtml {
    if (!url) return '';
    const cleanUrl = url.split('?')[0];
    const html = `
      <blockquote class="instagram-media" 
        data-instgrm-permalink="${cleanUrl}" 
        data-instgrm-version="14" 
        style="background:#FFF; border:0; margin: 1px; max-width:540px; min-width:326px; width:calc(100% - 2px);">
      </blockquote>
    `;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngAfterViewChecked(): void {
    // No procesamos aquí constantemente para no alentar la página
  }
}