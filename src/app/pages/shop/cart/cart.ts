import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent {
  // Simulación de productos en el carrito (Mock Data)
  cartItems = [
    {
      id: 1,
      name: 'Figura Caballero Hueco (Hollow Knight)',
      type: 'Resina Estándar - Gris',
      price: 450.00,
      quantity: 1,
      image: 'https://images.cults3d.com/9YHWIvInZ-oHinLaOqfc13SEiUM=/516x516/filters:no_upscale():format(webp)/https://fbi.cults3d.com/uploaders/32901761/illustration-file/9306dc66-2060-452f-bca6-735287ba4782/Hollow-knight-resin-3d-printed.jpeg' // Placeholder
    },
    {
      id: 2,
      name: 'Pack Miniaturas D&D (5 pzas)',
      type: 'Resina Alta Definición 8k (no incluye pintura)',
      price: 890.50,
      quantity: 2,
      image: 'https://lh3.googleusercontent.com/rd-gg-dl/ABS2GSmS7vAE-p-mIWkMZekFkIs-IjaMA4l7n4T5tu-U9pkfAoOHdriSyPmWH_41WEPxrMIMXnWjsk8yVOOWe7_NV-RknrlFf7TMH41ahljVxVSuZUXorXJbO1958_q8Xf6xukN1gEmxgsQsCW9FAzccmSDN36w9T92TruZyzhefXSToAZvVNL1rjW9pcQ5LBdFQHFNtX2Iko32IN5DO82Qwu3uStnn7s0rg78v7N5YYVibUm2tqQ3t8CZpjNCiFO5d8FJogvqbLF669f9UwMR96HOukPX8Briv23HOE-V1qw8UnrpdmjPUdbmFbytE0CM7tEIVdgCxDgfRvnQ62IB4CtfLvxGv_v11t5AIiIbEuQWz2ZTXae8df1ZJMpKHa-pZmWzlUIVbfKNQvIKzEGXsLzLCNADu4ZfHPEmX80RFHtVO_lS2lJQOfoZjXbNpflGwDZC4BRUuBkPnrk1AP9Ol5TdSs16_muyXKYvgUspSGteH_oGSWNzzJuXmYFnA3FTFjXBJ3SvfqHt3B3cGU7vte7Mc_DykdWQSBPdlw7rY5NbNCPaVivdJvtqG0PdSnGQk9EBuw1oa751UaIIQZ4oHEYaWzXws6MpK0lFCtxY5W1SnTXdyA8cFCWoixGnxRe9llGhqDxMBLPcy4jmyoyOVNPl-lvcQ8hwhmQDs1-p5tOTOZmv7xEjb81naZIstAwNuTqe_O09ccOEoXww1s9o2Xpl8zwRnCcvrX20d6hGU3lIMfGR-NJgIroSXkwi6bv9SsgCQVOejA_Ae1EkJnfg21Pl8nJF-G9AfNMSAkz7eGKs4Qy4r9vzTBPAVnz99xdAIiQsOSwzDk8cu-xJ7qClNmc3guS6TZBsKt-EUNI3Z9pDiLB3dhBTBwY-jv0x7XMOTsqiXrf9afapTngKmsvh1NMNV2wZ1O3cVoYOwOA9Gami3taf3zG7SkSJ6VLD2QfOpOj4KQcTLEvtrnoKobbR8kp63H6vBB0iA1fA93FM-C399_iMB0lrRGouLJ0bsWcNaP2UQ_Y553RFOW63ldAqwGIi59UPiF0JSkPw-qxT6OR7ejrR4uO2-5n56K_nNGl-EPyS2cnU9BStNz3m484jBuaHxCc74jtGm-M0JVNyT1DvZrGzBSsnbQBLT8WPD99D4HyKyEhDn0nelou0yfZzIXqfyXlwJC3X42ejFF-ZPXeg5bIpHiE5uRyBIRh5lBNqhrEIu5nHOwV1vEzL_BGYMxFwyiqiGxdenBKwOWTf2JfdDiswRYmTrS410qtAE_6HEWjPB_yiLJFHL2ZGaX8Z-OtCjMZqiIXQ=s1024-rj'
    }
  ];

  shippingCost = 150.00;

  // Calcular Subtotal
  getSubtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  // Calcular Total
  getTotal(): number {
    return this.getSubtotal() + this.shippingCost;
  }

  // Lógica simple para botones + y -
  increaseQty(item: any) {
    if (item.quantity < 10) item.quantity++;
  }

  decreaseQty(item: any) {
    if (item.quantity > 1) item.quantity--;
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }
}