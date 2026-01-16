import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig({
  plugins: [nodePolyfills(), reactRouter()],
});
