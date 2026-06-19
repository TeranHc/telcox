FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:22-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/dist/telcox-frontend /app
EXPOSE 3000
CMD ["sh", "-c", "serve -s . -l ${PORT:-3000}"]