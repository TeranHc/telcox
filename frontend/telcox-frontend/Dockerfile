# ETAPA 1: Construcción con Node 22 (REQUERIDO por Angular 22)
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# ETAPA 2: Servidor de producción con Node 22
FROM node:22-alpine
WORKDIR /app
RUN npm install -g serve
# Copiamos el build de Angular
COPY --from=build /app/dist/telcox-frontend/browser .
EXPOSE 3000
# Railway automáticamente asigna $PORT, usamos JSON array como recomienda Railway
CMD ["sh", "-c", "serve -s . -l ${PORT:-3000}"]