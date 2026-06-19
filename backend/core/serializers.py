from rest_framework import serializers
from .models import ServicioConsumo

class ServicioConsumoSerializer(serializers.ModelSerializer):
    cliente_nombre = serializers.CharField(source='cliente.nombre_completo', read_only=True)
    paquete_nombre = serializers.CharField(source='paquete.nombre', read_only=True)
    limite_datos = serializers.DecimalField(source='paquete.limite_datos_gb', max_digits=5, decimal_places=2, read_only=True)
    limite_minutos = serializers.IntegerField(source='paquete.limite_minutos', read_only=True)

    class Meta:
        model = ServicioConsumo
        fields = ['cliente_nombre', 'paquete_nombre', 'saldo_actual', 'datos_consumidos_gb', 'limite_datos', 'minutos_consumidos', 'limite_minutos']