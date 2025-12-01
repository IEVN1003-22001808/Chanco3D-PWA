import { Component, OnInit, AfterViewChecked, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service'; 
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare var instgrm: any;

@Component({
  selector: 'app-community-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './community-gallery.html',
  styleUrl: './community-gallery.css'
})
export class CommunityGalleryComponent implements OnInit, AfterViewChecked {
  private api = inject(ApiService);
  private sanitizer = inject(DomSanitizer);

  showForm = false;
  newPost = { title: '', description: '', image: '' };

  posts: any[] = [];

  ngOnInit(): void {
    this.cargarGaleria();
  }

  cargarGaleria() {
    this.api.getGaleria().subscribe({
      next: (data: any[]) => {
        this.posts = data.map(post => ({
          ...post,
          safeHtml: this.generateSafeHtml(post.image)
        }));
      },
      error: (e) => console.error(e)
    });
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }

  //solo se muestran las aprobadas
  get approvedPosts() {
    return this.posts.filter(post => post.status === 'Aprobada');
  }

  ngAfterViewChecked(): void {
    if (typeof instgrm !== 'undefined') {
        setTimeout(() => instgrm.Embeds.process(), 0);
    }
  }

  private generateSafeHtml(url: string): SafeHtml {
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

  publishPost() {
    const instagramRegex = /^https:\/\/(www\.)?instagram\.com\/p\/[a-zA-Z0-9_-]+\/?/;

    if(!instagramRegex.test(this.newPost.image)) {
      alert('URL inválida. Debe ser un post de Instagram.');
      return;
    }

    const nuevoPost = {
      title: this.newPost.title,
      author: localStorage.getItem('userName') || 'Anónimo', 
      image: this.newPost.image
    };

    this.api.postPublicacion(nuevoPost).subscribe({
      next: () => {
        alert('¡Enviado a moderación! Tu post aparecerá cuando el admin lo apruebe.');
        this.showForm = false;
        this.newPost = { title: '', description: '', image: '' };
        this.cargarGaleria();
      },
      error: () => alert('Error al publicar.')
    });
  }
}
