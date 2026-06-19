from django.urls import path
from .views import ConsumoDetalleAPIView
from .views import ConsumoDetalleAPIView, LoginAPIView, PaquetesAPIView # <-- Importa la nueva vista
urlpatterns = [
    path('consumo/<int:cliente_id>/', ConsumoDetalleAPIView.as_view(), name='consumo-detalle'),
    path('login/', LoginAPIView.as_view(), name='login'), # <-- Nueva ruta de login
    path('paquetes/', PaquetesAPIView.as_view(), name='paquetes'), # <-- Nueva ruta de paquetes
]