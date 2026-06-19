from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ServicioConsumo
from .serializers import ServicioConsumoSerializer
from django.contrib.auth import authenticate


class ConsumoDetalleAPIView(APIView):
    def get(self, request, cliente_id):
        try:
            # Obtenemos el consumo del cliente
            consumo = ServicioConsumo.objects.get(cliente__id=cliente_id)
            serializer = ServicioConsumoSerializer(consumo)
            return Response(serializer.data)
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