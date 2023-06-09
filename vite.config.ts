import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
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
