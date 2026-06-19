//consumo.model.ts
// Primero definimos cómo luce una factura individual
export interface Factura {
  id: number;
  monto: string;
  fecha_emision: string;
  estado: 'PAGADO' | 'PENDIENTE' | 'VENCIDO';
}

// Actualizamos tu interfaz principal Consumo para que acepte TODO lo que envía Django ahora
export interface Consumo {
  cliente_nombre: string;
  cliente_telefono: string;
  fecha_registro: string;
  paquete_nombre: string;
  paquete_precio: string;
  saldo_actual: string;
  datos_consumidos_gb: string;
  limite_datos: string; 
  minutos_consumidos: number;
  limite_minutos: number;
  // ¡Aquí está la clave! Le decimos a TypeScript que este modelo ahora incluye un arreglo de facturas
  facturas: Factura[]; 
}
export interface Paquete {
  id: number;
  nombre: string;
  datos: string;
  minutos: number | string;
  precio: string;
}