import fs from "fs";
import path from "path";
import vue from "rollup-plugin-vue";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import babel from "@rollup/plugin-babel";
import PostCSS from "rollup-plugin-postcss";
import ttypescript from "ttypescript";
import typescript from "rollup-plugin-typescript2";

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs
  .readFileSync("./.browserslistrc")
  .toString()
  .split("\n")
  .filter(entry => entry && entry.substring(0, 2) !== "ie");

// Extract babel preset-env config, to combine with esbrowserslist
const babelPresetEnvConfig = require("./babel.config").presets.filter(entry => entry[0] === "@babel/preset-env")[0][1];

export default {
  input: "src/index.ts",
  external: ["vue", "vee-validate"],
  output: {
    file: "dist/vue-headless-ui.esm.js",
    format: "esm",
    exports: "named"
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true
    }),
    alias({
      entries: [
        {
          find: "@",
          replacement: `${path.resolve(__dirname, "src")}`
        }
      ]
    }),
    vue(),
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"]
    }),
    // Process only `<style module>` blocks.
    PostCSS({
      modules: {
        generateScopedName: "[local]___[hash:base64:5]"
      },
      include: /&module=.*\.css$/
    }),
    // Process all `<style>` blocks except `<style module>`.
    PostCSS({ include: /(?<!&module=.*)\.css$/ }),
    commonjs(),
    typescript({
      typescript: ttypescript,
      useTsconfigDeclarationDir: true,
      emitDeclarationOnly: true
    }),
    babel({
      exclude: "node_modules/**",
      extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
      babelHelpers: "bundled",
      presets: [
        [
          "@babel/preset-env",
          {
            ...babelPresetEnvConfig,
            targets: esbrowserslist
          }
        ]
      ]
    })
  ]
};
