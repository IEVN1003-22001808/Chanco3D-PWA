import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-gallery-moderation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class GalleryComponent {
  
  imagenSeleccionada: string | null = null;

  // Mock Data: Mezcla de pendientes y ya moderados
  posts = [
    { 
      id: 1, 
      title: 'EVA-01 Pintado a mano', 
      author: 'Shinji_Ikari', 
      image: 'https://media.sketchfab.com/models/1ef660db7bcc481d8700892e8a8a022d/thumbnails/d948a2322e64426491d070ddb9ccf9fe/cc14e00769f4434b88e14c20ee127882.jpeg', 
      date: '2025-11-18',
      status: 'Pendiente' 
    },
    { 
      id: 2, 
      title: 'Cerebro Venoso y grueso', 
      author: 'Troll_User', 
      image: 'https://cbx-prod.b-cdn.net/COLOURBOX8224180.jpg?width=800&height=800&quality=70', 
      date: '2025-11-19',
      status: 'Rechazada' 
    },
    { 
      id: 3, 
      title: 'Dragón D&D Rojo', 
      author: 'DungeonMaster', 
      image: 'https://i.redd.it/mdgnd7tlrq0a1.jpg', 
      date: '2025-11-20',
      status: 'Aprobada' 
    },
    { 
      id: 4, 
      title: 'Maceta Bulbasaur', 
      author: 'PlantLover', 
      image: 'https://image.made-in-china.com/202f0j00uznqjpSlgUrg/Custom-Cute-Resin-Pokemon-Bulbasaur-Planter-Pot-for-Table-Home-Decor.webp', 
      date: '2025-11-21',
      status: 'Pendiente' 
    }
  ];

  aprobarPost(id: number) {
    const post = this.posts.find(p => p.id === id);
    if (post) {
      post.status = 'Aprobada';
      // Aquí conectaríamos con el backend para guardar el cambio
    }
  }

  rechazarPost(id: number) {
    if(confirm('¿Estás seguro de rechazar esta publicación? No se mostrará en la galería.')) {
      const post = this.posts.find(p => p.id === id);
      if (post) {
        post.status = 'Rechazada';
      }
    }
  }

  verImagenGrande(url: string) {
    this.imagenSeleccionada = url;
  }

  cerrarImagen() {
    this.imagenSeleccionada = null;
  }
}