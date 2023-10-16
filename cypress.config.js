const { defineConfig } = require("cypress");

module.exports = defineConfig({
    chromeWebSecurity: false,
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: "https://giftly.klickly-dev.com/marketplace",
        defaultCommandTimeout: 10000,
        pageLoadTimeout: 60000
    },
});