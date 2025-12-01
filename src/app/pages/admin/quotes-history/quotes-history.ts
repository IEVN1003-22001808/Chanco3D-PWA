import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-quotes-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quotes-history.html',
  styleUrl: './quotes-history.css' 
})
export class QuotesHistoryComponent implements OnInit {
  private api = inject(ApiService);
  cotizaciones: any[] = [];

  ngOnInit() {
    this.api.getHistorialCotizaciones().subscribe((data: any) => {
      this.cotizaciones = data;
    });
  }
}