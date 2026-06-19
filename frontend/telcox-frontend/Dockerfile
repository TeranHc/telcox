FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:22-alpine
RUN npm install -g serve
WORKDIR /app

# Copiar build de Angular
COPY --from=build /app/dist/telcox-frontend/browser /app

EXPOSE 3000
CMD serve -s . -l 3000