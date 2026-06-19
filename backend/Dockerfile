# Usamos Python 3.12
FROM python:3.12-slim

# Establecemos el directorio de trabajo
WORKDIR /app

# 🔹 NUEVO: Instalamos las dependencias del sistema operativo necesarias para compilar mysqlclient
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

# Ejecutar el servidor de desarrollo
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]