import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ConsumoService } from '../../services/consumo.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Consumo, Factura } from '../../models/consumo.model';
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
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  consumoData: Consumo | null = null;
  errorMessage: string = '';

  ngOnInit(): void {
    const sessionClienteId = localStorage.getItem('cliente_id');

    if (!sessionClienteId) {
      this.router.navigate(['/login']);
      return;
    }

    const clienteId = Number(sessionClienteId);

    this.consumoService.getConsumoCliente(clienteId).subscribe({
      next: (data: Consumo) => {
        this.consumoData = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.cdr.detectChanges();
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Abstracciones limpias para el HTML
  get clienteNombre(): string {
    return this.consumoData?.cliente_nombre || 'Cliente';
  }

  get telefono(): string {
    return this.consumoData?.cliente_telefono || 'No registrado';
  }

  get plan(): string {
    return this.consumoData?.paquete_nombre || 'Sin plan activo';
  }

  get precioPlan(): string {
    return this.consumoData?.paquete_precio || '0.00';
  }

  get saldo(): string {
    return this.consumoData?.saldo_actual || '0.00';
  }

  get fechaRegistro(): string {
    return this.consumoData?.fecha_registro || '';
  }

  get facturas(): Factura[] {
    return this.consumoData?.facturas || [];
  }

  // Cálculos de progreso con validación de seguridad
  get datosConsumidos(): string {
    return this.consumoData?.datos_consumidos_gb || '0';
  }

  get datosLimite(): string {
    return this.consumoData?.limite_datos || '0';
  }

  get porcentajeDatos(): number {
    if (!this.consumoData || Number(this.consumoData.limite_datos) === 0) return 0;
    const porcentaje = (Number(this.consumoData.datos_consumidos_gb) / Number(this.consumoData.limite_datos)) * 100;
    return porcentaje > 100 ? 100 : porcentaje;
  }

  get minutosConsumidos(): number {
    return this.consumoData?.minutos_consumidos || 0;
  }

  get minutosLimite(): number {
    return this.consumoData?.limite_minutos || 0;
  }

  get porcentajeMinutos(): number {
    if (!this.consumoData || this.consumoData.limite_minutos === 0) return 0;
    const porcentaje = (this.consumoData.minutos_consumidos / this.consumoData.limite_minutos) * 100;
    return porcentaje > 100 ? 100 : porcentaje;
  }
}