import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Consumo } from '../models/consumo.model';

@Injectable({
  providedIn: 'root'
})
export class ConsumoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/consumo'; // Cambia esto por la URL real de tu Django

  getConsumoCliente(clienteId: number): Observable<Consumo> {
    return this.http.get<Consumo>(`${this.apiUrl}/${clienteId}/`).pipe(
      catchError(this.handleError) // Manejo de errores requerido en la prueba
    );
  }

  private handleError(error: any) {
    console.error('Error en el API', error);
    return throwError(() => new Error('No se pudo cargar la información de consumo. Intente más tarde.'));
  }
}