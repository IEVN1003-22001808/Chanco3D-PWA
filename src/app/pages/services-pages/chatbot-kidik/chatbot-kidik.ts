import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
export class ChatbotComponent implements OnInit {

  isTyping: boolean = false;

  constructor() {}

  ngOnInit(): void {
  }

  goHome(): void {
    window.location.reload();
  }

  /**
   * Agrega un mensaje visualmente al chat
   */
  appendMessage(message: string, sender: string, isHTML: boolean = false): void {
    // ACTUALIZADO: Busca el ID en español
    const messageContainer = document.getElementById("contenedorMensajes");
    if (!messageContainer) return;

    const newMessage = document.createElement("div");
    // ACTUALIZADO: Usa la clase 'mensaje' y 'usuario' (si sender es 'usuario')
    newMessage.classList.add("mensaje", sender);

    if (isHTML) newMessage.innerHTML = message;
    else newMessage.textContent = message;

    messageContainer.appendChild(newMessage);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  /**
   * Envía el mensaje a la API y maneja la respuesta
   */
  async sendMessage(message: string): Promise<void> {
    // 1. Muestra el mensaje del usuario (enviamos "usuario" para que coincida con el CSS)
    this.appendMessage(message, "usuario", false);

    // 2. Activa indicador
    this.isTyping = true;

    // ACTUALIZADO: Busca el ID en español
    const messageContainer = document.getElementById("contenedorMensajes");
    if (!messageContainer) {
      console.error("Error: No se encontró el contenedor de mensajes.");
      this.isTyping = false;
      return;
    }

    try {
      // 3. Conexión con la API
      const response = await fetch('https://kidik2-0.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
      });

      const data = await response.json();
      const responseMessage: string = data.reply;
      const isHTML = responseMessage.includes('<a ') || responseMessage.includes('<br');

      // 4. Prepara la burbuja del bot
      this.appendMessage('', 'bot', isHTML);
      const botMessageContainer = messageContainer.lastChild as HTMLElement;

      if (message.trim().toLowerCase() === 'tengo un problema con mi producto') {
        if (botMessageContainer) {
          botMessageContainer.innerHTML = responseMessage;
        }
        this.isTyping = false;
        return;
      }

      // 5. Efecto de escritura
      setTimeout(() => {
        let i = 0;
        const typingCursor = document.createElement('span');
        // ACTUALIZADO: Usa la clase en español
        typingCursor.classList.add('cursor-escritura');

        if (botMessageContainer) botMessageContainer.appendChild(typingCursor);

        const typeLetter = () => {
          if (i < responseMessage.length && botMessageContainer) {
            const char = responseMessage.charAt(i);
            // ACTUALIZADO: Reemplaza la clase en español
            botMessageContainer.innerHTML = botMessageContainer.innerHTML.replace(/<span class="cursor-escritura"><\/span>/g, '') + char;
            
            if (botMessageContainer.lastChild !== typingCursor) {
              botMessageContainer.appendChild(typingCursor);
            }
            i++;
            
            // Auto-scroll (ID actualizado)
            const localContainer = document.getElementById("contenedorMensajes");
            if (localContainer) localContainer.scrollTop = localContainer.scrollHeight;

            let delay = Math.floor(Math.random() * 20) + 5;
            if (char === '.' || char === ',') delay += 100;

            setTimeout(typeLetter, delay);
          } else if (botMessageContainer) {
            typingCursor.remove();
            this.isTyping = false;
          }
        }
        typeLetter();
      }, 1500);

    } catch (error) {
      console.error('API Error:', error);
      this.appendMessage("Lo siento, hubo un error de conexión.", "bot");
      this.isTyping = false;
    }
  }

  async sendMessageFromSearch(message: string): Promise<void> {
    const cleanMessage = message ? message.trim() : '';
    if (cleanMessage) {
      await this.sendMessage(cleanMessage);
      
      // ACTUALIZADO: Busca el ID en español
      const input = document.getElementById('barraBusqueda') as HTMLInputElement;
      if (input) input.value = '';
    }
  }
}