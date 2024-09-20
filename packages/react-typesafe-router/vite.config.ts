import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";
  return {
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
      }),
    ],
    build: {
      sourcemap: !isProduction,
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "ReactTypesafeRouter",
        formats: ["es"],
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external: ["react", "react-dom", "react-router-dom"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react-router-dom": "ReactRouterDOM",
          },
        },
      },
      emptyOutDir: true,
    },
  };
});