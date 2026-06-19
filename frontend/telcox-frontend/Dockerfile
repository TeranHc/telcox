# Usar Node 20 o superior, requerido para Angular 22
FROM node:20-alpine

WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar las dependencias (usando npm, como indica tu packageManager)
RUN npm install

# Copiar todo el código fuente
COPY . .

# Exponer el puerto de Angular
EXPOSE 4200

# Iniciar la aplicación
CMD ["npm", "start", "--", "--host", "0.0.0.0"]