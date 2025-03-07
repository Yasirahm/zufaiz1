import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // Ensure React plugin is included
  server: {
    mimeTypes: {
      "js": "application/javascript",
      "jsx": "text/javascript", // Use correct MIME type for JSX
    },
    cors: true, // Allow cross-origin requests
    strictPort: true, // Ensures Vite runs on the specified port
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Separate vendor code
          }
        },
      },
    },
    target: "esnext", // Use modern JavaScript features
    minify: "esbuild", // Optimize build size
    sourcemap: true, // Enable source maps for debugging
    chunkSizeWarningLimit: 4000, // Adjust warning limit
  },
});
