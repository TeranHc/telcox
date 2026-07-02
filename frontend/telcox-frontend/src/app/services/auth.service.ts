import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  
  // 🚀 URL CORREGIDA APUNTANDO A PRODUCCIÓN EN RAILWAY
  private apiUrl = 'https://telcox-production.up.railway.app/api/login/'; 

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap(res => {
        // Si Django responde con éxito, guardamos el ID y el Nombre en el navegador
        if (res.cliente_id) {
          localStorage.setItem('cliente_id', res.cliente_id.toString());
          localStorage.setItem('cliente_nombre', res.nombre);
        }
      })
    );
  }

  logout(): void {
    // Limpia la sesión del usuario al salir
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    // Retorna true si hay un cliente con sesión activa
    return !!localStorage.getItem('cliente_id');
  }
}