import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-quote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-quote.html',
  styleUrl: './custom-quote.css'
})
export class CustomQuoteComponent {
  isDragging = false;
  fileSelected = false;
  fileName = '';
  fileSize = '';
  
  // Datos del formulario
  selectedMaterial = 'standard';
  height: number | null = null;
  infill = '20'; // Por defecto ligero
  quantity = 1;
  totalPrice = 0;

  // Historial de Cotizaciones (Mock Data inicial vacío)
  quoteHistory: any[] = [];

  // Eventos Drag & Drop
  onDragOver(e: Event) { e.preventDefault(); this.isDragging = true; }
  onDragLeave(e: Event) { e.preventDefault(); this.isDragging = false; }
  onDrop(e: any) {
    e.preventDefault();
    this.isDragging = false;
    if (e.dataTransfer.files.length > 0) this.handleFile(e.dataTransfer.files[0]);
  }

  onFileSelected(e: any) {
    if (e.target.files.length > 0) this.handleFile(e.target.files[0]);
  }

  handleFile(file: File) {
    if (!file.name.toLowerCase().endsWith('.stl') && !file.name.toLowerCase().endsWith('.obj')) {
      alert('Solo se permiten archivos .STL o .OBJ');
      return;
    }
    this.fileSelected = true;
    this.fileName = file.name;
    this.fileSize = (file.size / (1024 * 1024)).toFixed(2);
  }

  removeFile() {
    this.fileSelected = false;
    this.fileName = '';
    this.totalPrice = 0;
  }

  calculatePrice(e: Event) {
    e.preventDefault();
    if (!this.height || !this.fileSelected) {
      alert('Sube un archivo e ingresa la altura.');
      return;
    }
    
    // --- FÓRMULA DE COTIZACIÓN ---
    
    // 1. Costo Base por cm de altura (aprox)
    const baseCostPerCm = 15; 

    // 2. Multiplicador de Material [cite: 43]
    let materialFactor = 1;
    switch(this.selectedMaterial) {
      case 'standard': materialFactor = 1; break; // Resina Gris
      case 'tough': materialFactor = 1.3; break; // Alta resistencia
      case 'clear': materialFactor = 1.4; break; // Transparente
      case '8k': materialFactor = 1.8; break; // Alta Definición (Más caro)
    }

    // 3. Multiplicador de Relleno (Más resina = más caro)
    let infillFactor = 1;
    switch(this.infill) {
      case '20': infillFactor = 1.0; break;
      case '50': infillFactor = 1.4; break;
      case '100': infillFactor = 2.0; break; // Pieza sólida
    }

    // Cálculo final
    const unitPrice = (this.height * baseCostPerCm * materialFactor * infillFactor);
    this.totalPrice = unitPrice * this.quantity;

    // --- GUARDAR EN HISTORIAL ---
    this.addToHistory();
  }

  addToHistory() {
    const newQuote = {
      id: Date.now(), // ID temporal
      file: this.fileName,
      settings: `${this.getMaterialName(this.selectedMaterial)} - ${this.infill}%`,
      qty: this.quantity,
      total: this.totalPrice,
      date: new Date().toLocaleDateString()
    };
    
    // Agregamos al inicio de la lista
    this.quoteHistory.unshift(newQuote);
  }

  // Helper para mostrar nombre bonito
  getMaterialName(slug: string): string {
    const names: {[key: string]: string} = {
      'standard': 'Resina Estándar',
      'tough': 'Resina Tough',
      'clear': 'Resina Clear',
      '8k': 'Resina 8K'
    };
    return names[slug] || slug;
  }
}