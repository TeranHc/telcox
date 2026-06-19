from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate


# ¡IMPORTANTE! Asegúrate de importar Cliente y HistorialFacturacion aquí
from .models import ServicioConsumo, Cliente, HistorialFacturacion, Paquete

class ConsumoDetalleAPIView(APIView):
    def get(self, request, cliente_id):
        try:
            # 1. Obtenemos el consumo, trayendo de una vez los datos del cliente y paquete (optimización)
            consumo = ServicioConsumo.objects.select_related('cliente', 'paquete').get(cliente__id=cliente_id)
            
            # 2. Obtenemos todas las facturas de este cliente, ordenadas de la más reciente a la más antigua
            facturas = HistorialFacturacion.objects.filter(cliente__id=cliente_id).order_by('-fecha_emision')
            
            # 3. Armamos la lista de facturas
            facturas_data = []
            for factura in facturas:
                facturas_data.append({
                    "id": factura.id,
                    "monto": str(factura.monto),
                    "fecha_emision": factura.fecha_emision.strftime('%Y-%m-%d'),
                    "estado": factura.estado
                })
            
            # 4. Construimos el JSON unificado exacto que espera Angular
            data = {
                "cliente_nombre": consumo.cliente.nombre_completo,
                "cliente_telefono": consumo.cliente.telefono,
                "fecha_registro": consumo.cliente.fecha_registro.isoformat(),
                "paquete_nombre": consumo.paquete.nombre,
                "paquete_precio": str(consumo.paquete.precio),
                "saldo_actual": str(consumo.saldo_actual),
                "datos_consumidos_gb": str(consumo.datos_consumidos_gb),
                "limite_datos": str(consumo.paquete.limite_datos_gb),
                "minutos_consumidos": consumo.minutos_consumidos,
                "limite_minutos": consumo.paquete.limite_minutos,
                "facturas": facturas_data
            }
            
            return Response(data)
            
        except ServicioConsumo.DoesNotExist:
            return Response({"error": "No se encontró información de consumo para este cliente"}, status=404)

class LoginAPIView(APIView):
    def post(self, request):
        # Recibimos las credenciales desde Angular
        username = request.data.get('username')
        password = request.data.get('password')
        
        # Django verifica si la contraseña es correcta
        user = authenticate(username=username, password=password)
        
        if user is not None:
            try:
                # Buscamos el Cliente asociado a ese usuario
                cliente = Cliente.objects.get(usuario=user)
                return Response({
                    "mensaje": "Login exitoso", 
                    "cliente_id": cliente.id,
                    "nombre": cliente.nombre_completo
                })
            except Cliente.DoesNotExist:
                return Response({"error": "Este usuario no tiene un perfil de cliente asignado"}, status=403)
        else:
            return Response({"error": "Usuario o contraseña incorrectos"}, status=401)
class PaquetesAPIView(APIView):
    def get(self, request):
        paquetes_db = Paquete.objects.all()
        paquetes_list = []
        for p in paquetes_db:
            paquetes_list.append({
                "id": p.id,
                "nombre": p.nombre,
                "datos": str(p.limite_datos_gb),
                "minutos": p.limite_minutos,
                "precio": str(p.precio)
            })
        return Response(paquetes_list)