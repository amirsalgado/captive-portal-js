# Usa Node.js como base
FROM node:18 AS build

WORKDIR /app

# Copiar archivos y dependencias
COPY package*.json ./
RUN npm install
COPY . ./

# Construir la aplicación
RUN npm run build

# Usar una imagen ligera para servir el frontend
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist /app

# Servir la app en el puerto 3000
CMD ["serve", "-s", "/app", "-l", "3000"]
