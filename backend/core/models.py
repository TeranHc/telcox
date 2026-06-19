from django.db import models
from django.contrib.auth.models import User

# 1. Tabla de Paquetes
class Paquete(models.Model):
    nombre = models.CharField(max_length=100)
    limite_datos_gb = models.DecimalField(max_digits=5, decimal_places=2)
    limite_minutos = models.IntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nombre

# 2. Tabla de Clientes
class Cliente(models.Model):
    # Se conecta al sistema de usuarios que ya trae Django
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    nombre_completo = models.CharField(max_length=150)
    telefono = models.CharField(max_length=20, unique=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre_completo

# 3. Tabla de Servicios / Consumo
class ServicioConsumo(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    paquete = models.ForeignKey(Paquete, on_delete=models.CASCADE)
    saldo_actual = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    datos_consumidos_gb = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    minutos_consumidos = models.IntegerField(default=0)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Consumo de {self.cliente.nombre_completo}"

# 4. Tabla de Facturación
class HistorialFacturacion(models.Model):
    ESTADOS = (
        ('PAGADO', 'Pagado'),
        ('PENDIENTE', 'Pendiente'),
        ('VENCIDO', 'Vencido'),
    )
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_emision = models.DateField()
    estado = models.CharField(max_length=20, choices=ESTADOS, default='PENDIENTE')