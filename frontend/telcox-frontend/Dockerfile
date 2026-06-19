FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Verificar build
RUN ls -la dist/ && ls -la dist/telcox-frontend/ && ls -la dist/telcox-frontend/browser/ || echo "Estructura diferente"

FROM node:22-alpine
WORKDIR /app
RUN npm install -g serve

# Copiar el build donde sea que esté
COPY --from=build /app/dist/ /app/dist/

# Verificar archivos copiados
RUN ls -la /app/dist/
RUN find /app/dist/ -name "index.html"

# Crear script de inicio que encuentra el index.html
RUN echo '#!/bin/sh \
DIR=$(find /app/dist -name "index.html" -type f | head -1 | xargs dirname) \
echo "Sirviendo desde: $DIR" \
cd "$DIR" && serve -s . -l ${PORT:-3000}' > /start.sh && chmod +x /start.sh

EXPOSE 3000
CMD ["/start.sh"]