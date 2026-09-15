import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  base: "/mattrr/",
  plugins: [solid()],
  build: {
    target: "esnext",
  },
});
