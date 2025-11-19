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
  infill = '50';
  quantity = 1;
  estimatedPrice = 0;

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
    if (!file.name.toLowerCase().endsWith('.stl')) {
      alert('Solo se permiten archivos .STL');
      return;
    }
    this.fileSelected = true;
    this.fileName = file.name;
    this.fileSize = (file.size / (1024 * 1024)).toFixed(2);
  }

  removeFile() {
    this.fileSelected = false;
    this.fileName = '';
    this.estimatedPrice = 0;
  }

  calculatePrice(e: Event) {
    e.preventDefault();
    if (!this.height) {
      alert('Por favor ingresa la altura deseada.');
      return;
    }
    
    // Algoritmo "Fake" de cotización basado en altura y material
    const baseRate = this.selectedMaterial === '8k' ? 15 : 8; // Costo por cm
    const volumeFactor = this.height * 1.5; 
    const infillFactor = parseInt(this.infill) / 50;
    
    this.estimatedPrice = (volumeFactor * baseRate * infillFactor) * this.quantity;
  }
}