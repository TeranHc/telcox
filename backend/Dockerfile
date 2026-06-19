# Usamos Python 3.12
FROM python:3.12-slim

# Establecemos el directorio de trabajo
WORKDIR /app

# Instalamos dependencias del sistema necesarias para mysqlclient
RUN apt-get update && apt-get install -y \
    pkg-config \
    default-libmysqlclient-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copiar el requirements.txt y ejecutarlo
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el código del backend
COPY . .

# Exponer el puerto
EXPOSE 8000

# Usamos Gunicorn para producción. 
# Asegúrate de cambiar 'telcox_bss' por el nombre real de tu proyecto Django (donde está wsgi.py)
CMD gunicorn telcox_bss.wsgi:application --bind 0.0.0.0:$PORT