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
        insertTypesEntry: true, // 插入类型入口
      }),
    ],
    build: {
      sourcemap: !isProduction, // 仅在非生产环境中生成 source map
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
      emptyOutDir: true, // 自动清空 dist 目录
    },
  };
});
