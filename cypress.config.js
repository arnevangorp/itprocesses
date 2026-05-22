const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ztkuiy",
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
