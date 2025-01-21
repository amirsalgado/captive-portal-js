module.exports = {
    apps: [
      {
        name: 'backend', // Nombre del proceso para identificarlo
        script: 'server.js', // Archivo de entrada del backend
        cwd: './backend', // Directorio de trabajo del backend
        watch: true, // Reinicia si detecta cambios en el código
        env: {
          NODE_ENV: 'development',
          PORT: 5000, // Puerto que usa el backend
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
      {
        name: 'frontend', 
        script: 'npm',
        args: 'run start', 
        cwd: './frontend', 
        watch: false, // No es común observar cambios en el frontend en producción
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  