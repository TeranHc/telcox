export interface Consumo {
  cliente_nombre: string;
  paquete_nombre: string;
  saldo_actual: string; // Decimales de Python vienen como string en JSON usualmente
  datos_consumidos_gb: string;
  limite_datos: string;
  minutos_consumidos: number;
  limite_minutos: number;
}