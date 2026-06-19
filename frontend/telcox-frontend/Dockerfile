FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:22-alpine
RUN npm install -g serve
WORKDIR /app
# Copiar y luego mover el contenido de browser a raíz
COPY --from=build /app/dist/telcox-frontend /tmp/dist
RUN cp -r /tmp/dist/browser/* /app/ && rm -rf /tmp/dist
RUN ls -la /app/
EXPOSE 3000
CMD ["sh", "-c", "serve -s . -l ${PORT:-3000}"]