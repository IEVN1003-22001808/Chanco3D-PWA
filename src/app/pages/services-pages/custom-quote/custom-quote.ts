import { Component, inject } from '@angular/core'; // <--- Importar inject
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service'; // <--- Importar tu servicio

@Component({
  selector: 'app-custom-quote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-quote.html',
  styleUrl: './custom-quote.css'
})
export class CustomQuoteComponent {
  private api = inject(ApiService); // <--- Inyectar servicio

  isDragging = false;
  fileSelected = false;
  fileName = '';
  fileSize = '';

  selectedMaterial = 'standard';
  height: number | null = null;
  infill = '20';
  quantity = 1;
  totalPrice = 0;

  // Eventos Drag & Drop (igual que antes)
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
    // Validación simple
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
    const baseCostPerCm = 15;
    let materialFactor = 1;
    switch(this.selectedMaterial) {
      case 'standard': materialFactor = 1; break;
      case 'tough': materialFactor = 1.3; break;
      case 'clear': materialFactor = 1.4; break;
      case '8k': materialFactor = 1.8; break;
    }

    let infillFactor = 1;
    switch(this.infill) {
      case '20': infillFactor = 1.0; break;
      case '50': infillFactor = 1.4; break;
      case '100': infillFactor = 2.0; break;
    }

    const unitPrice = (this.height * baseCostPerCm * materialFactor * infillFactor);
    this.totalPrice = unitPrice * this.quantity;

    // --- AQUÍ ESTÁ EL CAMBIO: GUARDAR EN BD ---
    this.saveToDb();
  }

  saveToDb() {
    const cotizacion = {
      file: this.fileName,
      material: this.selectedMaterial, // Enviar separado
      infill: this.infill + '%',       // Enviar separado con el %
      height: this.height,             // ¡Importante! Enviar la altura
      qty: this.quantity,
      total: this.totalPrice
    };

    // Llamamos a la API
    this.api.guardarCotizacion(cotizacion).subscribe({
      next: (res: any) => {
        console.log('Cotización guardada en BD:', res);
        alert('¡Cotización guardada en el historial!'); // Feedback visual
      },
      error: (err) => console.error('Error al guardar cotización', err)
    });
  }
}
