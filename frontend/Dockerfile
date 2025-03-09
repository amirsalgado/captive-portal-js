# Usar una imagen de Node.js
FROM node:18

# Crear y movernos al directorio de trabajo
WORKDIR /app

# Copiar los archivos del frontend y construir la aplicación
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Instalar un servidor HTTP ligero
RUN npm install -g serve

# Exponer el puerto 80
EXPOSE 80

# Servir la aplicación estática
CMD ["serve", "-s", "dist", "-l", "80"]
