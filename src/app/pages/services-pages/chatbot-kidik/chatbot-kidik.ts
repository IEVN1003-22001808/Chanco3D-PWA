import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot-kidik.html',
  styleUrl: './chatbot-kidik.css',
  encapsulation: ViewEncapsulation.None
})
export class ChatbotComponent {

  abrirVen = false;
  escribiendo = false;
  Arrastre = false;
  posicion = { x: 0, y: 0 };
  private inicio = { x: 0, y: 0 };

  alternarChat() { this.abrirVen = !this.abrirVen; }

  iniciarArrastre(e: MouseEvent) {
    this.Arrastre = true;
    this.inicio = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  mover(e: MouseEvent) {
    if (!this.Arrastre) return;
    this.posicion.x += e.clientX - this.inicio.x;
    this.posicion.y += e.clientY - this.inicio.y;
    this.inicio = { x: e.clientX, y: e.clientY };
  }

  @HostListener('document:mouseup')
  soltar() { this.Arrastre = false; }

  agregarMensaje(mensaje: string, remitente: string, esHTML = false) {
    let contenedor: HTMLElement | null, div: HTMLElement;
    contenedor = document.getElementById("contenedorMensajes");
    if (!contenedor) return;

    div = document.createElement("div");
    div.classList.add("mensaje", remitente);
    esHTML ? (div.innerHTML = mensaje) : (div.textContent = mensaje);
    contenedor.appendChild(div);
    contenedor.scrollTop = contenedor.scrollHeight;
  }

  async enviarMensaje(mensaje: string) {
    let contenedor: HTMLElement | null, res: Response, data: any, reply: string, esHTML: boolean, botMsg: HTMLElement | null;

    this.agregarMensaje(mensaje, "usuario");
    this.escribiendo = true;

    contenedor = document.getElementById("contenedorMensajes");
    if (!contenedor) { this.escribiendo = false; return; }

    try {
      res = await fetch('http://localhost:5000/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: mensaje })
      });

      data = await res.json();
      reply = data.reply;
      esHTML = reply.includes('<a ') || reply.includes('<br');

      this.agregarMensaje('', 'bot', esHTML);
      botMsg = contenedor.lastChild as HTMLElement;

      if (mensaje.trim().toLowerCase() === 'tengo un problema con mi producto' || esHTML) {
        if (botMsg) botMsg.innerHTML = reply;
        this.escribiendo = false;
        return;
      }

      setTimeout(() => {
        let i = 0, cursor: HTMLElement, type: () => void;

        cursor = document.createElement('span');
        cursor.classList.add('cursor-escritura');
        if (botMsg) botMsg.appendChild(cursor);

        type = () => {
          let cont: HTMLElement | null, delay: number;
          if (i < reply.length && botMsg) {
            botMsg.innerHTML = botMsg.innerHTML.replace(/<span class="cursor-escritura"><\/span>/g, '') + reply.charAt(i);
            if (botMsg.lastChild !== cursor) botMsg.appendChild(cursor);
            i++;
            cont = document.getElementById("contenedorMensajes");
            if (cont) cont.scrollTop = cont.scrollHeight;

            delay = Math.floor(Math.random() * 20) + 5;
            if (['.', ','].includes(reply.charAt(i))) delay += 100;
            setTimeout(type, delay);
          } else {
            cursor.remove();
            this.escribiendo = false;
          }
        };
        type();
      }, 1500);

    } catch (error) {
      console.error('API Error:', error);
      this.agregarMensaje("Error de conexión.", "bot");
      this.escribiendo = false;
    }
  }

  enviarMsg(mensaje: string) {
    this.enviarMensaje(mensaje.trim());
    (document.getElementById('barraBusqueda') as HTMLInputElement).value = '';
  }
}