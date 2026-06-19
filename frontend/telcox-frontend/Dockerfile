# ETAPA 1: Construcción
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# ETAPA 2: Servidor de producción
FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
# Copiamos la carpeta 'dist' generada en la etapa 1
# Nota: verifica que la ruta sea 'dist/telcox-frontend/browser'
COPY --from=build /app/dist/telcox-frontend/browser .

# -s sirve la app en modo Single Page Application (SPA), solucionando el error 404
CMD serve -s . -l $PORT