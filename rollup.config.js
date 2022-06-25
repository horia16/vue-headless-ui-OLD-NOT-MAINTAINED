// Rollup is used to generate the d.ts files for the library as vite can not generate prop types for the components.

import path from "path";
import vue from "rollup-plugin-vue";
import alias from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";
import ttypescript from "ttypescript";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "./src/index.ts",
  external: ["vue"],
  output: {
    file: "./dist/rollup_build.js", // We still need to build the lib unfortunately
    format: "esm",
  },
  plugins: [
    vue(),
    alias({
      entries: [
        {
          find: "@",
          replacement: `${path.resolve(__dirname, "src")}`
        }
      ]
    }),
    resolve({
      extensions: [".ts", ".vue"]
    }),
    typescript({
      typescript: ttypescript,
      useTsconfigDeclarationDir: false,
      emitDeclarationOnly: true
    })
  ]
};
