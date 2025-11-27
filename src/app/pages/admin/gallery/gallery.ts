import { Component, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare var instgrm: any;

@Component({
  selector: 'app-gallery-moderation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class GalleryComponent implements AfterViewChecked {

  postSeleccionado: any = null;

  posts = [
    { id: 1, title: 'EVA-01', author: 'Shinji', image: 'https://www.instagram.com/p/CmzgqrOu41P/', date: '2025-11-18', status: 'Pendiente' },
    // ... más datos mock
  ];

  constructor(private sanitizer: DomSanitizer) {}

  // Cuando se abre el modal, Angular pinta el HTML, luego llamamos a Instagram
  ngAfterViewChecked(): void {
    if (this.postSeleccionado && typeof instgrm !== 'undefined') {
      instgrm.Embeds.process();
    }
  }

  getInstagramEmbed(url: string): SafeHtml {
    const cleanUrl = url.split('?')[0];
    const html = `
      <blockquote class="instagram-media"
        data-instgrm-permalink="${cleanUrl}"
        data-instgrm-version="14"
        style="background:#FFF; border:0; margin: 1px; max-width:540px; min-width:326px; width:100%;">
      </blockquote>
    `;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  verPost(post: any) {
    this.postSeleccionado = post;
    // Forzamos un pequeño delay o proceso para asegurar que el modal abra antes de procesar
    setTimeout(() => {
        if(typeof instgrm !== 'undefined') instgrm.Embeds.process();
    }, 100);
  }

  cerrarModal(event: any) {
    // Lógica simple para cerrar
    this.postSeleccionado = null;
  }

  aprobarPost(id: number) { /* ... tu lógica existente ... */ }
  rechazarPost(id: number) { /* ... tu lógica existente ... */ }
}
