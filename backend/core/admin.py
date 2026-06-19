from django.contrib import admin
from .models import Paquete, Cliente, ServicioConsumo, HistorialFacturacion

admin.site.register(Paquete)
admin.site.register(Cliente)
admin.site.register(ServicioConsumo)
admin.site.register(HistorialFacturacion)