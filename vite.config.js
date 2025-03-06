import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Ensure React plugin is included

export default defineConfig({
  plugins: [react()], // Added React plugin
  server: {
    port: 3000, // You can change the port if needed
    strictPort: true,
    open: true, // Auto-open browser when running dev server
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
    chunkSizeWarningLimit: 2000, // Increased warning limit for larger projects
    outDir: "dist", // Ensure the correct output directory
    emptyOutDir: true, // Clean the output directory before each build
  },
});
