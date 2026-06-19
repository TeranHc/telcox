# Cambiamos a Python 3.12 para soportar Django 6.x
FROM python:3.12-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el requirements.txt y ejecutarlo
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el código del backend
COPY . .

# Exponer el puerto
EXPOSE 8000

# Ejecutar el servidor de desarrollo
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]