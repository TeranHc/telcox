# Usar Python 3.11 (ideal para tus versiones recientes de Django)
FROM python:3.11-slim

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