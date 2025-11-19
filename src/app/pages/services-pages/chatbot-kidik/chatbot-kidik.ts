import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot-kidik.html',
  styleUrl: './chatbot-kidik.css'
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  userInput = '';
  isTyping = false;

  // Historial de chat inicial
  messages = [
    { text: '¡Hola Maker! Soy Kidik 🤖. ¿En qué puedo ayudarte hoy?', sender: 'bot', time: this.getTime() }
  ];

  // Botones de respuesta rápida 
  quickOptions = [
    '¿Cuánto cuesta el envío?',
    '¿Qué materiales usan?',
    'Quiero una figura personalizada',
    '¿Dónde están ubicados?'
  ];

  // Auto-scroll al fondo cuando llega un mensaje nuevo
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  sendMessage(text: string | null = null) {
    const msgText = text || this.userInput.trim();
    if (!msgText) return;

    // 1. Agregar mensaje del usuario
    this.messages.push({ text: msgText, sender: 'user', time: this.getTime() });
    this.userInput = '';
    this.isTyping = true; // Kidik empieza a "pensar"

    // 2. Simular respuesta del bot después de 1.5 segundos
    setTimeout(() => {
      this.botReply(msgText);
      this.isTyping = false;
    }, 1500);
  }

  botReply(userMsg: string) {
    const msg = userMsg.toLowerCase();
    let reply = '';

    // Lógica simple de palabras clave (Base de Conocimientos Mock) [cite: 399]
    if (msg.includes('envío') || msg.includes('costo')) {
      reply = 'El envío estándar cuesta $150 MXN a todo el país. Si tu pedido es mayor a $2,000, ¡el envío es gratis! 🚚';
    } else if (msg.includes('material') || msg.includes('resina')) {
      reply = 'Usamos principalmente Resina Estándar 8K para máximo detalle. También tenemos resina flexible y transparente bajo pedido. 🧪';
    } else if (msg.includes('personalizada') || msg.includes('cotizar')) {
      reply = '¡Claro! Puedes usar nuestro "Cotizador Inteligente" en el menú superior para subir tu archivo STL y obtener precio al instante. 📐';
    } else if (msg.includes('ubicados') || msg.includes('tienda')) {
      reply = 'Somos una tienda 100% online operando desde León, Guanajuato. Enviamos a todo México. 🇲🇽';
    } else if (msg.includes('hola') || msg.includes('buenos')) {
      reply = '¡Hola! ¿Listo para materializar tus ideas? 😎';
    } else {
      reply = 'Mmm, aún estoy aprendiendo y no entendí eso. 😅 ¿Podrías intentar con las opciones de abajo o contactar a un humano en la sección de Soporte?';
    }

    this.messages.push({ text: reply, sender: 'bot', time: this.getTime() });
  }

  getTime(): string {
    const now = new Date();
    return now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
  }
}

// ya le mueves tú @alfa, alch no me acuerdo q tanta mamada tenía el chat XD
//q esto te sirva de ejemplo