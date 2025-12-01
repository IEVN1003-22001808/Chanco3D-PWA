import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-custom-quote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-quote.html',
  styleUrl: './custom-quote.css'
})
export class CustomQuoteComponent {
  private api = inject(ApiService);

  isDragging = false;
  fileSelected = false;
  fileName = '';
  fileSize = '';
  fileSizeVal: number = 0;
  
  selectedMaterial = 'standard';
  height: number | null = null;
  infill = '20'; 
  quantity = 1;
  totalPrice = 0;

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

    this.fileSizeVal = file.size / (1024 * 1024); 
    this.fileSize = this.fileSizeVal.toFixed(2);
  }
 
  removeFile() {
    this.fileSelected = false;
    this.fileName = '';
    this.totalPrice = 0;
    this.fileSizeVal = 0;
  }

  calculatePrice(e: Event) {
    e.preventDefault();
    if (!this.height || !this.fileSelected) {
      alert('Sube un archivo e ingresa la altura.');
      return;
    }
    
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


    let decimalPart = this.fileSizeVal - Math.floor(this.fileSizeVal);
    let complexityFactor = decimalPart < 0.1 ? 1.1 : (1 + decimalPart);

    console.log(`Peso: ${this.fileSize}MB | Factor Complejidad: ${complexityFactor.toFixed(2)}`);

    const unitPrice = (this.height * baseCostPerCm * materialFactor * infillFactor) * complexityFactor;
    this.totalPrice = unitPrice * this.quantity;
  
    this.saveToDb();
  }
 
  saveToDb() {
    const cotizacion = {
      file: this.fileName,
      material: this.selectedMaterial,
      infill: this.infill + '%',
      height: this.height,
      qty: this.quantity,
      total: this.totalPrice
    };

    this.api.guardarCotizacion(cotizacion).subscribe({
      next: (res: any) => {
        alert(`Cotización Generada: $${this.totalPrice.toFixed(2)} MXN\n(Guardada en historial)`);
      },
      error: (err) => console.error(err)
    });
  }
}