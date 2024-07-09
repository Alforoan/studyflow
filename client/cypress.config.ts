import { defineConfig } from "cypress";
import * as dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    env: {
      auth0_domain: process.env.VITE_AUTH0_DOMAIN
    },
  },
  viewportWidth: 1440, 
  viewportHeight: 900,
});
