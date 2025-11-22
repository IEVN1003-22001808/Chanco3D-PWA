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


  abrirVen: boolean = false; 
  escribiendo: boolean = false;
  Arrastre = false;
  
  // posicion mouse
  posX = 0;
  posY = 0;

  //posicion rt
  posicion = { x: 0, y: 0 }; 
  FinalPos = { x: 0, y: 0 };


  alternarChat(): void {
    this.abrirVen = !this.abrirVen;
  }

  // funcion para arrastrar
  iniciarArrastre(evento: MouseEvent): void {
    this.Arrastre = true;
    this.posX = evento.clientX;
    this.posY = evento.clientY;
    evento.preventDefault(); 
  }

  // Escucha el movimiento del mouse en todo el documento.
  @HostListener('document:mousemove', ['$event'])
  alMoverMouse(evento: MouseEvent): void {
    if (!this.Arrastre) return; 

    // Calcula cuánto se ha movido el mouse desde el click inicial.
    const deltaX = evento.clientX - this.posX;
    const deltaY = evento.clientY - this.posY;

    // Actualiza la posición sumando el desplazamiento a la última posición guardada.
    this.posicion.x = this.FinalPos.x + deltaX;
    this.posicion.y = this.FinalPos.y + deltaY;
  }

  // Escucha cuando se suelta el click en cualquier parte.
  @HostListener('document:mouseup')
  alSoltarMouse(): void {
    if (this.Arrastre) {
      this.Arrastre = false; // Detiene el modo arrastre.
      this.FinalPos = { ...this.posicion }; // Guarda la nueva posición final.
    }
  }



  // contenedor
  agregarMensaje(mensaje: string, remitente: string, esHTML: boolean = false): void {
    const contenedorMensajes = document.getElementById("contenedorMensajes");
    if (!contenedorMensajes) return;

    const nuevoMensaje = document.createElement("div");
    nuevoMensaje.classList.add("mensaje", remitente);
    if (esHTML) nuevoMensaje.innerHTML = mensaje;
    else nuevoMensaje.textContent = mensaje;

    contenedorMensajes.appendChild(nuevoMensaje);

    // scroll
    contenedorMensajes.scrollTop = contenedorMensajes.scrollHeight;
  }

  // env mensaje
  async enviarMensaje(mensaje: string): Promise<void> {
    this.agregarMensaje(mensaje, "usuario", false);
    //efecto
    this.escribiendo = true; 

    const contenedorMensajes = document.getElementById("contenedorMensajes");
    if (!contenedorMensajes) { this.escribiendo = false; return; }

    try {
      // api en render api (se va a borrar )
      const respuesta = await fetch('https://kidik2-0.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: mensaje })
      });

      const datos = await respuesta.json();
      const mensajeRespuesta: string = datos.reply;
      
      
      const esHTML = mensajeRespuesta.includes('<a ') || mensajeRespuesta.includes('<br');

      this.agregarMensaje('', 'bot', esHTML);
      const contenedorMensajeBot = contenedorMensajes.lastChild as HTMLElement;

      // mensaje con link 
      if (mensaje.trim().toLowerCase() === 'tengo un problema con mi producto') {
        if (contenedorMensajeBot) contenedorMensajeBot.innerHTML = mensajeRespuesta;
        this.escribiendo = false;
        return;
      }

      // efecto
      setTimeout(() => {
        let i = 0;
        // efecto
        const cursorEscritura = document.createElement('span');
        cursorEscritura.classList.add('cursor-escritura');
        
        if (contenedorMensajeBot) contenedorMensajeBot.appendChild(cursorEscritura);

        // eefcto
        const escribirLetra = () => {
          if (i < mensajeRespuesta.length && contenedorMensajeBot) {
            const caracter = mensajeRespuesta.charAt(i);
            
            // efecto
            contenedorMensajeBot.innerHTML = contenedorMensajeBot.innerHTML.replace(/<span class="cursor-escritura"><\/span>/g, '') + caracter;
            if (contenedorMensajeBot.lastChild !== cursorEscritura) contenedorMensajeBot.appendChild(cursorEscritura);
            i++;
            
            // scroll 
            const contenedorLocal = document.getElementById("contenedorMensajes");
            if (contenedorLocal) contenedorLocal.scrollTop = contenedorLocal.scrollHeight;
            
            //efecto
            let retraso = Math.floor(Math.random() * 20) + 5;
            if (caracter === '.' || caracter === ',') retraso += 100; 
            
            setTimeout(escribirLetra, retraso);
          } else if (contenedorMensajeBot) {
            cursorEscritura.remove();
            this.escribiendo = false;
          }
        }
        escribirLetra(); 
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