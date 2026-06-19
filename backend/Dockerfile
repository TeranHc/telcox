FROM python:3.12-slim

WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    pkg-config \
    default-libmysqlclient-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements primero (mejor cacheo)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código
COPY . .

# Crear directorios necesarios
RUN mkdir -p /app/staticfiles

# Recoger archivos estáticos
RUN python manage.py collectstatic --noinput

EXPOSE 8000

# Crear entrypoint script
RUN echo '#!/bin/bash\n\
echo "Running migrations..."\n\
python manage.py migrate --noinput\n\
echo "Starting Gunicorn..."\n\
exec gunicorn telcox_bss.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 3 --timeout 120' > /entrypoint.sh \
    && chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]