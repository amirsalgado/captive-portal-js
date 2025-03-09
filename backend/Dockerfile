# Usa una imagen de Node.js como base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del package.json y package-lock.json para instalar dependencias primero (mejor caché)
COPY package*.json ./

# Instala las dependencias
RUN npm install --omit=dev  # Solo instala dependencias de producción

# Copia el resto del código fuente
COPY . .

# Expone el puerto 5000
EXPOSE 5000

# Instala PM2 globalmente
RUN npm install -g pm2

# Comando para iniciar la aplicación con PM2
CMD ["pm2-runtime", "start", "server.js", "--name", "backend"]
