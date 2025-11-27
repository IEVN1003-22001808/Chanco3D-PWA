import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare var instgrm: any;

@Component({
  selector: 'app-community-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './community-gallery.html',
  styleUrl: './community-gallery.css'
})
export class CommunityGalleryComponent implements OnInit, AfterViewChecked {
  showForm = false;

  // Objeto para nuevo post
  newPost = { title: '', description: '', image: '' };

  // Ahora definimos la estructura con un campo extra opcional 'safeHtml'
  posts: any[] = [
    { title: 'Figura Anime', author: 'Maker1', image: 'https://www.instagram.com/p/DNCVgWDuCiw/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', status: 'Aprobada' },
    { title: 'Setup 3D', author: 'Rogelio', image: 'https://www.instagram.com/p/DNOpgacP_EU/', status: 'Aprobada' },
    { title: 'Error de impresión', author: 'Troll', image: 'https://www.instagram.com/p/DNCVgWDuCiw/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', status: 'Rechazada'},
    { title: 'Modelo Custom', author: 'ClienteX', image: 'https://www.instagram.com/p/DNOpgacP_EU/', status: 'Aprobada' }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  // 1. Calculamos el HTML seguro AL INICIAR, una sola vez.
  ngOnInit(): void {
    this.posts.forEach(post => {
      post.safeHtml = this.generateSafeHtml(post.image);
    });
  }

  // 2. Solo devolvemos los que ya están aprobados
  get approvedPosts() {
    return this.posts.filter(post => post.status === 'Aprobada');
  }

  // 3. Controlamos que Instagram procese los embeds sin volverse loco
  ngAfterViewChecked(): void {
    if (typeof instgrm !== 'undefined') {
        // Usamos setTimeout para sacarlo del ciclo de detección de cambios de Angular
        setTimeout(() => {
            instgrm.Embeds.process();
        }, 0);
    }
  }

  // Función auxiliar privada (ya no se llama desde el HTML)
  private generateSafeHtml(url: string): SafeHtml {
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

  publishPost() {
    const instagramRegex = /^https:\/\/(www\.)?instagram\.com\/p\/[a-zA-Z0-9_-]+\/?/;

    if(!instagramRegex.test(this.newPost.image)) {
      alert('URL inválida');
      return;
    }

    // Al crear uno nuevo, le generamos su HTML seguro al momento
    const nuevoPost = {
      title: this.newPost.title,
      author: 'Tú (Maker)',
      image: this.newPost.image,
      status: 'Pendiente',
      safeHtml: this.generateSafeHtml(this.newPost.image) // <--- Generamos aquí
    };

    this.posts.unshift(nuevoPost);
    this.showForm = false;
    this.newPost = { title: '', description: '', image: '' };
    alert('¡Enviado a moderación!');
  }
}
