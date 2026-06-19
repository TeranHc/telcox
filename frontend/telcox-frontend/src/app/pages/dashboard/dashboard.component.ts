import { Component, OnInit, inject } from '@angular/core';
import { ConsumoService } from '../../services/consumo.service';
import { Consumo } from '../../models/consumo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private consumoService = inject(ConsumoService);
  
  consumoData: Consumo | null = null;
  errorMessage: string = '';

  ngOnInit(): void {
    this.consumoService.getConsumoCliente(1).subscribe({
      // Usamos 'any' temporalmente para poder inspeccionar la estructura real
      next: (data: any) => {
        console.log('¡Datos recibidos desde Django!', data);
        
        // ¡Solución blindada! 
        // Si Django envió una lista con 1 elemento, tomamos ese primer elemento.
        // Si envió el objeto directo, lo tomamos tal cual.
        if (Array.isArray(data) && data.length > 0) {
          this.consumoData = data[0]; 
        } else {
          this.consumoData = data;
        }
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

  // --- NUEVAS FUNCIONES PARA CALCULAR PORCENTAJES ---

  get porcentajeDatos(): number {
    if (!this.consumoData) return 0;
    // Convertimos los strings a números para la división
    return (Number(this.consumoData.datos_consumidos_gb) / Number(this.consumoData.limite_datos)) * 100;
  }

  get porcentajeMinutos(): number {
    if (!this.consumoData) return 0;
    return (this.consumoData.minutos_consumidos / this.consumoData.limite_minutos) * 100;
  }
}