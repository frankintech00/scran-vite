import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Scran | A Recipe App for the Web",
        short_name: "Scran",
        description:
          "Scran is a web application that allows users to search for recipes, add their own recipes, and create a shopping list based on the recipes they have selected. It was created as part of a Masters project for the MSc in Software Development at the University of Starthclyde.",
        icons: [
          {
            src: "/assets/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/assets/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: "/",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
      },
    }),
  ],
  esbuild: {
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
  },
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.js"],
    globals: true,
    css: true,
  },
  server: {
    host: "127.0.0.1",
  },
});
