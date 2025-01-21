module.exports = {
    apps: [
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
    ],
  };
  