import { defineConfig } from "vite";

export default defineConfig({
  server: {
    mimeTypes: {
      "js": "application/javascript",
      "jsx": "application/javascript"
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit (optional)
  },
});
