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

# Iniciar la aplicación
CMD ["npm", "start", "--", "--host", "0.0.0.0"]