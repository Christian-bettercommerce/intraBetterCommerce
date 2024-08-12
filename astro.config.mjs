import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import preact from "@astrojs/preact";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact()],
  output: 'hybrid',
  adapter: node({
    mode: "standalone"
  }),
  server:{
    port: import.meta.env.PORT
  },
  image: {
    service: passthroughImageService(),
  }
});