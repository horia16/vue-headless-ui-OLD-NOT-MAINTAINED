/// <reference types="vitest" />

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import autoImport from "unplugin-auto-import/vite";
import esLint from "vite-plugin-eslint";

export default defineConfig({
  test: {
    include: ["./src/**/*.test.ts"],
    environment: "happy-dom"
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "MyLib",
      fileName: (format) => `vue-headless-ui.${format}.js`
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  },

  plugins: [
    vue(),
    esLint(),
    autoImport({
      imports: ["vue"],
      dts: "src/auto-imports.d.ts"
    })
  ]
});
