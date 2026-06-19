# Usar Node 20 o superior
FROM node:20-alpine

WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Agregar --legacy-peer-deps para ignorar el choque de versiones de ngx-toastr
RUN npm install --legacy-peer-deps

# Copiar todo el código fuente
COPY . .

# Exponer el puerto de Angular
EXPOSE 4200

#  CAMBIO CLAVE: Leer el puerto de Railway y permitir conexiones externas
CMD sh -c "npm start -- --host 0.0.0.0 --port $PORT --disable-host-check"