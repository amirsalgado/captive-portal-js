module.exports = {
  apps: [
    // Backend
    {
      name: 'backend', // Nombre del proceso para identificarlo
      script: 'server.js', // Archivo de entrada del backend
      cwd: './backend', // Directorio de trabajo del backend
      exec_mode: 'fork', // Modo de ejecución del backend
      instances: 1, // Número de instancias del backend
      watch: true, // Reinicia si detecta cambios en el código
      env: {
        NODE_ENV: 'development',
        PORT: 5000, // Puerto que usa el backend
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
    },

    // Frontend (servir aplicación construida con 'serve')
    {
      name: 'frontend', // Nombre del proceso para identificarlo
      script: 'npx', // Usamos npx para ejecutar 'serve' sin necesidad de instalación global
      args: 'serve -s frontend/dist -l 3000', // Comando para servir el frontend
      cwd: './frontend', // Directorio raíz donde se encuentra la carpeta 'frontend'
      watch: false, // No necesitamos que se reinicie con cambios, solo sirve la versión construida
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
