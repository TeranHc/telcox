import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Consumo, Paquete } from '../models/consumo.model'; 

@Injectable({
  providedIn: 'root'
})
export class ConsumoService {
  private http = inject(HttpClient);
  
  // URLs apuntando a tu backend en producción en Railway
  private apiUrl = 'https://telcox-production.up.railway.app/api/consumo'; 
  private apiPaquetesUrl = 'https://telcox-production.up.railway.app/api/paquetes'; 

  // 🔹 OBTENER EL CONSUMO DEL CLIENTE
  getConsumoCliente(clienteId: number): Observable<Consumo> {
    return this.http.get<Consumo>(`${this.apiUrl}/${clienteId}/`).pipe(
      catchError(this.handleError)
    );
  }

  // 🔹 OBTENER LOS PAQUETES DISPONIBLES DE LA BASE DE DATOS
  getPaquetesDisponibles(): Observable<Paquete[]> {
    return this.http.get<Paquete[]>(`${this.apiPaquetesUrl}/`).pipe(
      catchError(this.handleError)
    );
  }

  // 🔹 MANEJO CENTRALIZADO DE ERRORES
  private handleError(error: any) {
    console.error('Error en el API:', error);
    return throwError(() => new Error('No se pudo cargar la información. Intente más tarde.'));
  }
}