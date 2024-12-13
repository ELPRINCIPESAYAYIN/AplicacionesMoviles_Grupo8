import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8100', // Cambia a la URL de tu app
    supportFile: false, // Desactiva archivo de soporte si no existe
  },
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '*/.cy.ts', // Patrones de pruebas
  },
});