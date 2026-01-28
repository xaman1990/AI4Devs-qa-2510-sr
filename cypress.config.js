const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3002', // Assuming default React/Node port, adjust if known
    specPattern: 'cypress/integration/**/*.cy.js',
    supportFile: false, // Disabling support file for simplicity if not present
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
