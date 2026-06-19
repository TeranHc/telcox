FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# DEBUG: Ver qué se generó exactamente
RUN echo "=== Contenido de dist/ ===" && ls -la dist/
RUN echo "=== Contenido de dist/telcox-frontend/ ===" && ls -la dist/telcox-frontend/ || echo "No existe dist/telcox-frontend"
RUN echo "=== Buscando index.html ===" && find dist/ -name "index.html"

FROM nginx:alpine

# DEBUG: Ver qué se copió
COPY --from=build /app/dist /usr/share/nginx/html
RUN echo "=== Archivos copiados a nginx ===" && ls -la /usr/share/nginx/html/
RUN echo "=== Buscando index.html ===" && find /usr/share/nginx/html/ -name "index.html"

# Configuración de Nginx CORREGIDA
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Debug: mostrar requests \
    access_log /var/log/nginx/access.log; \
    error_log /var/log/nginx/error.log debug; \
}' > /etc/nginx/conf.d/default.conf

# Verificar configuración
RUN nginx -t

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]