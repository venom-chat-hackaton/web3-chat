import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import path from "path";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

const wasmContentTypePlugin = {
  name: "wasm-content-type-plugin",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url.endsWith(".wasm")) {
        res.setHeader("Content-Type", "application/wasm");
      }
      next();
    });
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // wasmContentTypePlugin,
    wasm(),
    topLevelAwait(),
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      { find: "src", replacement: path.resolve(__dirname, "src") },
      { find: "contracts", replacement: path.resolve(__dirname, "contracts") },
    ],
  },
});
