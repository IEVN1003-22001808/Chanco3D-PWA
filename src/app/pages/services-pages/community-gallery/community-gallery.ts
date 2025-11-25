import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-community-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './community-gallery.html',
  styleUrl: './community-gallery.css'
})
export class CommunityGalleryComponent {
  showForm = false;
  
  // Objeto para nuevo post
  newPost = { title: '', description: '', image: '' };

  // Mock Data de la comunidad
  posts = [
    { title: 'Caballero Blanco', author: 'MasterPainter', image: 'https://images.unsplash.com/photo-1663120788441-23335e40dea7?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', status: 'Aprobada' },
    { title: 'Golem de Pantano', author: 'Rogelio', image: 'https://i.etsystatic.com/41836915/r/il/f83fed/6972103517/il_794xN.6972103517_tt8l.jpg', status: 'Aprobada' },
    { title: 'Mecha Suit', author: 'GeorgeL', image: 'https://p.turbosquid.com/ts-thumb/Jn/Egzosx/NP/bhwts11/jpg/1636663200/1920x1080/fit_q99/686f4fca135930e37f7317e52cf11cac303050da/bhwts11.jpg', status: 'Aprobada' },
    { title: 'Cerebro Venoso y grueso', author: 'Troll', image: 'https://cbx-prod.b-cdn.net/COLOURBOX8224180.jpg?width=800&height=800&quality=70', status: 'Rechazada'},
    { title: 'Baby Yoda 8K', author: 'Leo3D', image: 'https://p.turbosquid.com/ts-thumb/Z2/YLcrod/w9/grogubabyyodabowlreadyto3dprint_tournaround_00/jpg/1619093787/1920x1080/fit_q99/1631e16db9a56bba2b54d18584fed994c2ceaecf/grogubabyyodabowlreadyto3dprint_tournaround_00.jpg', status: 'Aprobada' }
  ];

  get approvedPosts() {
    return this.posts.filter(post => post.status === 'Aprobada');
  }

  publishPost() {
    if(!this.newPost.image.startsWith('http')) {
      alert('La URL de la imagen no es válida');
      return;
    }
    // Agregamos al inicio (simulado)
    this.posts.unshift({
      title: this.newPost.title,
      author: 'Tú (Maker)',
      image: this.newPost.image,
      status: 'Pendiente' // <--- IMPORTANTE: No se verá hasta que el Admin apruebe
    });

    this.showForm = false;
    this.newPost = { title: '', description: '', image: '' };
    alert('¡Tu creación ha sido enviada a moderación! (Simulado)');
  }
}