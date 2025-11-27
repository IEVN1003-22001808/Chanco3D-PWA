import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-management',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent {

  mostrarModal = false;
  editingId: number | null = null;

  nuevoProducto = {
    name: '',
    category: 'Figuras',
    price: 0,
    description: '',
    image: ''
  };
  
  // Mock Data de Productos
  products = [
    { 
      id: 1, 
      name: 'Caballero Hueco (Hollow Knight)', 
      category: 'Figuras', 
      price: 450.00, 
      description: 'Figura de colección de 15cm, acabado gris mate listo para pintar.',
      image: 'https://images.cults3d.com/9YHWIvInZ-oHinLaOqfc13SEiUM=/516x516/filters:no_upscale():format(webp)/https://fbi.cults3d.com/uploaders/32901761/illustration-file/9306dc66-2060-452f-bca6-735287ba4782/Hollow-knight-resin-3d-printed.jpeg' 
    },
    { 
      id: 2, 
      name: 'Pack Miniaturas D&D', 
      category: 'Tabletop', 
      price: 890.50, 
      description: 'Set de 5 monstruos para campaña de rol. Resina de alta tenacidad.',
      image: 'https://lh3.googleusercontent.com/rd-gg-dl/ABS2GSmS7vAE-p-mIWkMZekFkIs-IjaMA4l7n4T5tu-U9pkfAoOHdriSyPmWH_41WEPxrMIMXnWjsk8yVOOWe7_NV-RknrlFf7TMH41ahljVxVSuZUXorXJbO1958_q8Xf6xukN1gEmxgsQsCW9FAzccmSDN36w9T92TruZyzhefXSToAZvVNL1rjW9pcQ5LBdFQHFNtX2Iko32IN5DO82Qwu3uStnn7s0rg78v7N5YYVibUm2tqQ3t8CZpjNCiFO5d8FJogvqbLF669f9UwMR96HOukPX8Briv23HOE-V1qw8UnrpdmjPUdbmFbytE0CM7tEIVdgCxDgfRvnQ62IB4CtfLvxGv_v11t5AIiIbEuQWz2ZTXae8df1ZJMpKHa-pZmWzlUIVbfKNQvIKzEGXsLzLCNADu4ZfHPEmX80RFHtVO_lS2lJQOfoZjXbNpflGwDZC4BRUuBkPnrk1AP9Ol5TdSs16_muyXKYvgUspSGteH_oGSWNzzJuXmYFnA3FTFjXBJ3SvfqHt3B3cGU7vte7Mc_DykdWQSBPdlw7rY5NbNCPaVivdJvtqG0PdSnGQk9EBuw1oa751UaIIQZ4oHEYaWzXws6MpK0lFCtxY5W1SnTXdyA8cFCWoixGnxRe9llGhqDxMBLPcy4jmyoyOVNPl-lvcQ8hwhmQDs1-p5tOTOZmv7xEjb81naZIstAwNuTqe_O09ccOEoXww1s9o2Xpl8zwRnCcvrX20d6hGU3lIMfGR-NJgIroSXkwi6bv9SsgCQVOejA_Ae1EkJnfg21Pl8nJF-G9AfNMSAkz7eGKs4Qy4r9vzTBPAVnz99xdAIiQsOSwzDk8cu-xJ7qClNmc3guS6TZBsKt-EUNI3Z9pDiLB3dhBTBwY-jv0x7XMOTsqiXrf9afapTngKmsvh1NMNV2wZ1O3cVoYOwOA9Gami3taf3zG7SkSJ6VLD2QfOpOj4KQcTLEvtrnoKobbR8kp63H6vBB0iA1fA93FM-C399_iMB0lrRGouLJ0bsWcNaP2UQ_Y553RFOW63ldAqwGIi59UPiF0JSkPw-qxT6OR7ejrR4uO2-5n56K_nNGl-EPyS2cnU9BStNz3m484jBuaHxCc74jtGm-M0JVNyT1DvZrGzBSsnbQBLT8WPD99D4HyKyEhDn0nelou0yfZzIXqfyXlwJC3X42ejFF-ZPXeg5bIpHiE5uRyBIRh5lBNqhrEIu5nHOwV1vEzL_BGYMxFwyiqiGxdenBKwOWTf2JfdDiswRYmTrS410qtAE_6HEWjPB_yiLJFHL2ZGaX8Z-OtCjMZqiIXQ=s1024-rj',
    },
    { 
      id: 3, 
      name: 'Soporte Auriculares Cyberpunk', 
      category: 'Accesorios', 
      price: 650.00, 
      description: 'Soporte funcional para escritorio con estética futurista.',
      image: 'https://d22fxaf9t8d39k.cloudfront.net/61d5f58ba030339cf56b16e53d79e34abc3639699c836fc014d9083578543ba432164.jpeg',
    },
    { 
      id: 4, 
      name: 'Busto Spider-Man 2099', 
      category: 'Figuras', 
      price: 1200.00, 
      description: 'Busto escala 1/10 con gran nivel de detalle en texturas.',
      image: 'https://media.printables.com/media/prints/543480/images/4372439_a0bbf125-eb3c-4049-9a11-2375b21d5360/thumbs/inside/1280x960/png/s2099_4.webp',
    },
    {
      id: 5,
      name: 'GT-R NISMO (PROTOTIPO)',
      category: 'Ingeniería',
      price: 450.00,
      description: 'Ñs.',
      image: 'https://lh3.googleusercontent.com/rd-gg-dl/ABS2GSnEGJ1C9xqKqRW0Pa7OdYLSs5wGi_y3WfaIx6G_OejruOFt_p3OUInBBuI8RdB435QuEltLgCUsPEOtWMpvtiLnSVYiS_NLFiQbs2WcUNVBwv_Tu81q3pLU6-zyDyOmlpFjph5k0pIzIJ_2vRzeZrWEffsH6iEEkYSpJLVIWO0xQZOWv3WGvn6BUGMKqidWqNTM7bFQHsrgXJWi886RMtzknwPxegIcj7-CHQ0GM1CqUJqswMAw6kbEPDVX-gM5WhWKsPcacybGt0QOO0swGG6L-d_umKnbK9FixIU4BmzkBsRJP73egbOdyMXnaYYYL039YT7s7acJHhOzCdomVVvxkGOpYyNXfFpxfL9wCW7gTiP-S-YqZmvLckzVqz49m-iqIB34GPCHu8aFm7mpfV6rVjc_B5_dojPBSlZV-hIRepFcYDYc1Q7yghawR8qYhTkWNQlCIbGsenINNaNaiFcd6u9GS8p9l3L-VhNU1vPOklrZWxOd0K1wVW9nbQu5s4qOM9U6fLAXujldPZJcfx67NN-m06KShUMv2HDNTzEfwkTDVBVONAjlHH3I3bvLnbHbAiWO7FraEot09m7lcbBSw4iTnhFntyVbL9Rk6yIgr_dm1ZwnkgeIpRASlPXHY76EjbwqWJ4o-Llrya5pXAXL7A9Tb5FSKOoyCIae8wQN7oaxc68qZNBQBrjDwR6HYNUyqBjAd7Hyj8vQIrpNDruNORQaBZB2EjpudShXskAC4Qy4Hiy3UjCGaMkm6k7fV0IA8pGDceoUHwmNTUrv7vqtG5t55GK6FgoGUqfLrLRnaOl7bPX3zvI4M023dgnTaQVJGWe6hcVXoiQxJM4ASMDVWimm6exYcDQkFzPQ0vb0AReubieJsyorDrEwDLfNEZeaNhrQ5y7S22fHGp13qyTk8h3qRPQClE2Z43A-tueZw3hZELpcX_Kstur_cGaB3m_0cnvQAOOTq6JqcfXRhudGyslbXWAzzd74h5EEu2e_P86qYStpiyx5n8rNR3Hubf0K2xbvG_eE68ozqi7CAOxfNHpODOW4Dsa0KTqmoiocc5GcweUJ6S1v_5-OIu-iBEImEoy_--IqTuNrAeLpy5W7UL8IFcz_kT8PGnHljW_xuk8BAum7nXENt3VULOn6p7Dd3Klo5gIrjVH_Q2X0XM4-nhJUIkPbStkJzPY0__JmCIcVnPnijjGNXL5WpF1kJAuo2KO-QLEwJaL_RnbPhRzlMHZbnwIiQVziX5ElvUGcF4nYEaSIKjDggTsE26qQJ470TyczyO62rTeWiL25Mzfu8PhecA=s1024-rj',
    },
    {
      id: 6,
      name: 'Maceta Oddish Pokémon',
      category: 'Decoración',
      price: 250.00,
      description: 'Ñs.',
      image: 'https://images.cults3d.com/axUvNi_LYCmqneV1hJjsEcz9x0Y=/516x516/filters:no_upscale():format(webp)/https://fbi.cults3d.com/uploaders/18850278/illustration-file/bfd50fce-6f8f-4aa4-9ddb-d2541f13add2/oddishB_01.png',
    }
  ];

  abrirModal(){ 
    this.editingId = null;
    this.nuevoProducto = { name: '', category: 'Figuras', price: 0, description: '', image: '' };
    this.mostrarModal = true; 
  }

  editarProducto(producto: any) {
    this.editingId = producto.id;
    this.nuevoProducto = { ...producto }; 
    this.mostrarModal = true;
  }
  
  cerrarModal() { 
    this.mostrarModal = false;
    this.nuevoProducto = { name: '', category: 'Figuras', price: 0, description: '', image: '' };
  }

  // Guardar Producto
  guardarProducto() {
    if (this.nuevoProducto.name && this.nuevoProducto.price > 0) {
      
      if (this.editingId) {
        // --- CASO EDITAR ---
        const index = this.products.findIndex(p => p.id === this.editingId);
        if (index !== -1) {
          this.products[index] = { ...this.nuevoProducto, id: this.editingId };
          alert('Producto actualizado correctamente.');
        }
      }
      else {
        // --- CASO CREAR ---
        this.products.push({
          id: Date.now(),
          name: this.nuevoProducto.name,
          category: this.nuevoProducto.category,
          price: this.nuevoProducto.price,
          description: this.nuevoProducto.description || 'Sin descripción',
          image: this.nuevoProducto.image || 'https://via.placeholder.com/150' 
        });
        alert('Producto agregado al catálogo.');
      }
      
      this.cerrarModal();
    } else {
      alert('Por favor completa el nombre y el precio.');
    }
  }

  deleteProduct(id: number) {
    if(confirm('¿Eliminar este producto del catálogo permanentemente?')) {
      this.products = this.products.filter(p => p.id !== id);
    }
  }
}