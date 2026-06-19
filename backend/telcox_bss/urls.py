from django.contrib import admin
from django.urls import path, include # <-- Importa include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Conectamos las urls de la app 'core' usando el prefijo 'api/'
    path('api/', include('core.urls')), 
]